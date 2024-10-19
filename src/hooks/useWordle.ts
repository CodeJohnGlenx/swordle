import { wordleStore } from "@/feature/wordleStore";
import Database from "better-sqlite3";
import { useMemo } from "react";

export default function useWordle() {
//   const db = useMemo(() => new Database("words.db"), []);
//   const query = useMemo(() => {
//     return `
//     SELECT * FROM words
//     ORDER BY RANDOM()
//     LIMIT 10;
//     `;
//   }, []);

//   const result = useMemo(() => {
//     return db.prepare(query).all();
//   }, [query, db]);

//   return {
//     result,
//   }
}
