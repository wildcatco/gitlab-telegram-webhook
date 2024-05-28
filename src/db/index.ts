import { JsonDB, Config } from 'node-json-db';
import { Notification } from '../types/notification';
import fs from 'fs';

declare global {
  var db: JsonDB;
}

const DATA_FILE = 'src/data/notifications.json';

export function initializeDB() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }

  const db = new JsonDB(new Config(DATA_FILE, true, true, '/'));
  global.db = db;
}

export function getDB() {
  return global.db;
}

export async function getNotifications() {
  const data = await getDB().getData('/');
  const notifications = Object.values(data) as Notification[];
  return notifications;
}
