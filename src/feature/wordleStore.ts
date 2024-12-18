import { create } from "zustand";

export const wordleStore = create((set, get) => ({
  correct: "",
  included: "",
  excluded: "",
  overlap: () => {
    const state : any = get();

    const includedAndCorrectChars = `${state.included}${state.correct}`.split(
      ""
    );

    for (const char of includedAndCorrectChars) {
      if (state.excluded.includes(char)) {
        return true;
      }
    }
    return false;
  },
  wordLength: 5,
  words: [],
  setCorrect: (correct: string) => set({ correct: correct.toUpperCase() }),
  setIncluded: (included: string) => set({ included: included.toUpperCase() }),
  setExcluded: (excluded: string) => set({ excluded: excluded.toUpperCase() }),
  setWordLength: (wordLength: number) => set({ wordLength }),
  setWords: (words: string[]) => set({ words }),
}));
