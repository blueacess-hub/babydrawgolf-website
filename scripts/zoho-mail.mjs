#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const ACCOUNT = 'info@babydrawgolf.net';
const SERVICES = {
  clientId: 'com.benduan.babydraw.zoho.client-id',
  clientSecret: 'com.benduan.babydraw.zoho.client-secret',
  refreshToken: 'com.benduan.babydraw.zoho.refresh-token',
};

function keychain(service) {
  return execFileSync('/usr/bin/security', ['find-generic-password', '-a', ACCOUNT, '-s', service, '-w'], { encoding: 'utf8' }).trim();
}

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function accessToken() {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: keychain(SERVICES.refreshToken),
    client_id: keychain(SERVICES.clientId),
    client_secret: keychain(SERVICES.clientSecret),
  });
  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', { method: 'POST', body });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) throw new Error(`Zoho OAuth failed: ${payload.error || response.status}`);
  return payload.access_token;
}

async function api(path, init = {}) {
  const token = await accessToken();
  const response = await fetch(`https://mail.zoho.com/api${path}`, {
    ...init,
    headers: { Authorization: `Zoho-oauthtoken ${token}`, ...(init.headers || {}) },
  });
  const payload = await response.json();
  if (!response.ok || payload.status?.code >= 300) throw new Error(`Zoho Mail API failed: ${payload.status?.description || response.status}`);
  return payload.data;
}

async function account() {
  const accounts = await api('/accounts');
  const result = accounts.find((item) => (item.primaryEmailAddress || item.emailAddress) === ACCOUNT);
  if (!result) throw new Error(`Expected account ${ACCOUNT} was not returned`);
  return result;
}

async function status() {
  const current = await account();
  const folders = await api(`/accounts/${current.accountId}/folders`);
  const summary = folders.filter((folder) => ['Sent', 'Outbox'].includes(folder.folderType)).map((folder) => ({
    type: folder.folderType, id: folder.folderId, name: folder.folderName,
  }));
  console.log(JSON.stringify({ account: ACCOUNT, folders: summary }, null, 2));
}

async function send() {
  const to = option('--to');
  const subject = option('--subject');
  const text = option('--text');
  if (!to || !subject || !text) throw new Error('Usage: zoho-mail.mjs send --to EMAIL --subject SUBJECT --text BODY');
  const current = await account();
  await api(`/accounts/${current.accountId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromAddress: ACCOUNT, toAddress: to, subject, content: text, mailFormat: 'plaintext' }),
  });
  console.log(`Sent from ${ACCOUNT} to ${to}`);
}

const command = process.argv[2] || 'status';
if (command === 'status') await status();
else if (command === 'send') await send();
else throw new Error('Usage: zoho-mail.mjs [status|send --to EMAIL --subject SUBJECT --text BODY]');
