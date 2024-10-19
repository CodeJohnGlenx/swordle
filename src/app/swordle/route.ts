import Database from "better-sqlite3";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = new Database("src/db/words.db");
    db.pragma("journal_mode = WAL");

    const included = req.nextUrl.searchParams.get("included") ?? "";
    const correct = req.nextUrl.searchParams.get("correct") ?? "";
    const excluded = req.nextUrl.searchParams.get("excluded") ?? "";
    const length = req.nextUrl.searchParams.get("length") ?? "5";
    const limit = 24;

    const result = db
      .prepare(
        generateQuery(included, correct, excluded, parseInt(length), limit)
      )
      .all();

    const words = getWords(result);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "GET word suggestions success",
        data: words,
      }),
      { status: 200 }
    );
  } catch {
    return new Response(
      JSON.stringify({
        status: "error",
        message: "something went wrong",
        data: [],
      }),
      { status: 420 }
    );
  }
}

function getWords(arr: any[]) {
  let words: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    const word = arr[i]?.word ?? "";
    words.push(word);
  }

  return words;
}

function generateQuery(
  included: string,
  correct: string,
  excluded: string,
  length: number,
  limit: number
) {
  let excludedLetters = excluded.toLowerCase().split("");
  let includedLetters = included.toLowerCase().split("");
  let wordLength = length;
  let wordArr = Array.from({ length: wordLength }, () => "_");
  let clueWord = parseCorrectWord(correct.toLowerCase(), length);

  for (let i = 0; i < wordLength; i++) {
    if (clueWord[i] !== "_") {
      wordArr[i] = clueWord[i];
    } else {
      wordArr[i] = "";
    }
  }

  console.log(wordArr);

  const excludedLettersQuery = excludedLetters.reduce((query, letter) => {
    return query + `AND word NOT LIKE '%${letter}%' `;
  }, "");

  const includedLettersQuery = includedLetters.reduce((query, letter) => {
    return query + `AND word LIKE '%${letter}%' `;
  }, "");

  let subStringQuery = "";
  for (let i = 0; i < wordLength; i++) {
    if (wordArr[i] !== "") {
      subStringQuery += `AND SUBSTR(word, ${i + 1}, 1) = '${wordArr[i]}' `;
    }
  }

  return `
    SELECT * FROM words
    WHERE length = ${wordLength}
    ${excludedLettersQuery}
    ${includedLettersQuery}
    ${subStringQuery}
    ORDER BY RANDOM()
    LIMIT ${limit};
    `;
}

function parseCorrectWord(correct: string, length: number) {
  let wordArr = Array.from({ length: length }, () => "_");

  for (let i = 0; i < length; i++) {
    if (correct[i] && correct[i] !== "_") {
      wordArr[i] = correct[i];
    }
  }

  return wordArr.join("");
}
