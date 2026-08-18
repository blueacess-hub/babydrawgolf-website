#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const ENDPOINT = "https://api.vercel.com/v1/query/web-analytics/visits/count";
const KEYCHAIN_SERVICE = "Baby Draw Golf Vercel Analytics API";
const DEFAULT_PROJECT_ID = "prj_ll1PUwin5GQ5LCKy6ByMx8yO78aU";
const DEFAULT_TEAM_ID = "team_QQu9hjDlSWBoq2LSe8mEeRiX";

function usage() {
  return `Read-only Baby Draw Golf Vercel Analytics query

Usage:
  node scripts/vercel-analytics.mjs [options]

Options:
  --days <n>             Rolling number of days to query (default: 7)
  --since <ISO-8601>     Start timestamp; requires --until
  --until <ISO-8601>     End timestamp; requires --since
  --filter <expression>  Vercel Analytics filter expression
  --project-id <id>      Override the Baby Draw Golf Vercel project ID
  --team-id <id>         Override the Vercel team ID
  --json                 Print the complete API response as JSON
  --help                 Show this message

Authentication:
  Reads BDG_VERCEL_TOKEN from the current shell, or a macOS Keychain item
  whose service name is "${KEYCHAIN_SERVICE}". The token is never printed.
`;
}

function requireValue(args, index, flag) {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function parseArgs(args) {
  const options = { days: 7, json: false };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--help") {
      options.help = true;
    } else if (argument === "--json") {
      options.json = true;
    } else if (argument === "--days") {
      options.days = Number(requireValue(args, index, argument));
      index += 1;
    } else if (argument === "--since") {
      options.since = requireValue(args, index, argument);
      index += 1;
    } else if (argument === "--until") {
      options.until = requireValue(args, index, argument);
      index += 1;
    } else if (argument === "--filter") {
      options.filter = requireValue(args, index, argument);
      index += 1;
    } else if (argument === "--project-id") {
      options.projectId = requireValue(args, index, argument);
      index += 1;
    } else if (argument === "--team-id") {
      options.teamId = requireValue(args, index, argument);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  if (!Number.isInteger(options.days) || options.days < 1 || options.days > 90) {
    throw new Error("--days must be an integer from 1 to 90.");
  }
  if (Boolean(options.since) !== Boolean(options.until)) {
    throw new Error("Use --since and --until together.");
  }

  return options;
}

function toIsoTimestamp(value, flag) {
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.valueOf())) {
    throw new Error(`${flag} must be a valid ISO-8601 timestamp.`);
  }
  return timestamp.toISOString();
}

function dateRange(options) {
  if (options.since) {
    const since = toIsoTimestamp(options.since, "--since");
    const until = toIsoTimestamp(options.until, "--until");
    if (Date.parse(since) > Date.parse(until)) {
      throw new Error("--since must be earlier than --until.");
    }
    return { since, until };
  }

  const until = new Date();
  const since = new Date(until.valueOf() - options.days * 24 * 60 * 60 * 1000);
  return { since: since.toISOString(), until: until.toISOString() };
}

function tokenFromKeychain() {
  if (process.platform !== "darwin") return undefined;

  try {
    const token = execFileSync(
      "/usr/bin/security",
      ["find-generic-password", "-s", KEYCHAIN_SERVICE, "-w"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return token || undefined;
  } catch {
    return undefined;
  }
}

function analyticsToken() {
  return process.env.BDG_VERCEL_TOKEN || tokenFromKeychain();
}

function numericMetric(value) {
  return typeof value === "number" ? value : "n/a";
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const token = analyticsToken();
  if (!token) {
    throw new Error(
      "No Vercel token found. Set BDG_VERCEL_TOKEN for this shell or save it in macOS Keychain using the service name shown by --help.",
    );
  }

  const { since, until } = dateRange(options);
  const query = new URLSearchParams({
    projectId: options.projectId || DEFAULT_PROJECT_ID,
    teamId: options.teamId || DEFAULT_TEAM_ID,
    since,
    until,
  });
  if (options.filter) query.set("filter", options.filter);

  const response = await fetch(`${ENDPOINT}?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => undefined);
  if (!response.ok) {
    const message = typeof body?.error?.message === "string" ? body.error.message : response.statusText;
    throw new Error(`Vercel Analytics API returned ${response.status}: ${message}`);
  }

  if (options.json) {
    process.stdout.write(`${JSON.stringify(body, null, 2)}\n`);
    return;
  }

  const data = body?.data || {};
  process.stdout.write(
    [
      "Baby Draw Golf — Vercel Web Analytics (read-only)",
      `Range (UTC): ${since} to ${until}`,
      `Visitors: ${numericMetric(data.visitors)}`,
      `Page Views: ${numericMetric(data.pageviews)}`,
      options.filter ? `Filter: ${options.filter}` : "Filter: none",
    ].join("\n") + "\n",
  );
}

main().catch((error) => {
  process.stderr.write(`Error: ${error.message}\n`);
  process.exitCode = 1;
});
