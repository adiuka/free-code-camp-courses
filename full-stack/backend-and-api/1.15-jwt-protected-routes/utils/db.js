import path from "path";
import fs from "fs";

const DB = path.join(import.meta.dirname, "../data/users.json");

export function readUsers() {
  const data = fs.readFileSync(DB, "utf-8").trim();
  if (!data) return [];
  return JSON.parse(data);
}

export function writeUsers(users) {
	fs.writeFileSync(DB, JSON.stringify(users, null, 2));
}

export function findByEmail(email) {
	return readUsers().find((user) => user.email === email) || null;
}

export function findById(id) {
	return readUsers().find((user) => user.id === id) || null;
}