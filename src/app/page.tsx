"use client";
import WordsDrawer from "@/components/drawer/WordsDrawer";
import Keyboard from "@/components/input/Keyboard";
import OtpInput from "@/components/input/OtpInput";
import { Label } from "@/components/ui/label";
import { OverlapAlert } from "@/components/ui/OverlapAlert";
import { wordleStore } from "@/feature/wordleStore";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import axios from "axios";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const wordle: any = wordleStore((state) => state);
  const handleSwordle = useCallback(async () => {
    const overlap = wordle.overlap();

    const response = await axios.get("/swordle", {
      params: {
        included: wordle.included ?? "",
        correct: wordle.correct ?? "",
        excluded: wordle.excluded ?? "",
        length: 5,
      },
    });

    if (Array.isArray(response?.data?.data)) {
      wordle.setWords(response?.data?.data);
    }
  }, [wordle.included, wordle.correct, wordle.excluded]);

  const overlap = useMemo(() => {
    return wordle.overlap();
  }, [wordle.included, wordle.correct, wordle.excluded]);

  return (
    <div>
      <Navbar />

      <div
        className={cn(
          "grid justify-items-center gap-2 p-4",
          "md:gap-4",
          "lg:gap-6"
        )}
      >
        {overlap && (
          <div className="my-4">
            <OverlapAlert />
          </div>
        )}

        <div className="grid justify-items-center">
          <OtpInput
            initialLength={5}
            maxLength={5}
            inputType="correct"
            onChange={wordle.setCorrect}
          />

          <Label className="text-base text-slate-400 md:text-lg lg:text-xl">
            Type underscore as blank space.(e.g. _ab_c)
          </Label>
        </div>

        <OtpInput
          initialLength={5}
          maxLength={5}
          inputType="included"
          onChange={wordle.setIncluded}
        />

        <OtpInput
          initialLength={5}
          maxLength={20}
          inputType="excluded"
          onChange={wordle.setExcluded}
        />
      </div>

      <div className={cn("py-4 md:py-6 lg:py-10", `scale-x-90 scale-y-90`)}>
        <Keyboard />
      </div>

      <div className="pb-4">
        <WordsDrawer onSwordle={handleSwordle} words={wordle.words} />
      </div>
    </div>
  );
}
