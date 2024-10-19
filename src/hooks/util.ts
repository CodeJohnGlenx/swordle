"use server";

import Database from "better-sqlite3";

const db = new Database("C:/Users/John Glen/Desktop/Simplify/Personal-Projects/sordle/swordle/src/db/words.db");
db.pragma("journal_mode = WAL");

export async function getWords(length: number) {
  const x = db
    .prepare(
      `SELECT word FROM words WHERE length = 5 ORDER BY RANDOM() LIMIT 10;`
    )
    .all();

  console.log(x);
}
