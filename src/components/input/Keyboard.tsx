import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { wordleStore } from "@/feature/wordleStore";

type KeyProps = {
  label?: string;
  onPress?: () => void;
};

export default function Keyboard() {
  return (
    <div className={cn("grid justify-items-center gap-2")}>
      <div className={cn("flex flex-row gap-x-1 md:gap-x-2 lg:gap-x-3")}>
        <Key label={"Q"} />
        <Key label={"W"} />
        <Key label={"E"} />
        <Key label={"R"} />
        <Key label={"T"} />
        <Key label={"Y"} />
        <Key label={"U"} />
        <Key label={"I"} />
        <Key label={"O"} />
        <Key label={"P"} />
      </div>

      <div className={cn("flex flex-row gap-x-1 md:gap-x-2 lg:gap-x-3")}>
        <Key label={"A"} />
        <Key label={"S"} />
        <Key label={"D"} />
        <Key label={"F"} />
        <Key label={"G"} />
        <Key label={"H"} />
        <Key label={"J"} />
        <Key label={"K"} />
        <Key label={"L"} />
      </div>

      <div className={cn("flex flex-row gap-x-1 md:gap-x-2 lg:gap-x-3")}>
        <Key label={"Z"} />
        <Key label={"X"} />
        <Key label={"C"} />
        <Key label={"V"} />
        <Key label={"B"} />
        <Key label={"N"} />
        <Key label={"M"} />
      </div>
    </div>
  );
}

function Key(props: KeyProps) {
  const wordle: any = wordleStore((state) => state);

  const backgroundState = useMemo(() => {
    const included = wordle.included.toUpperCase().split("");
    const correct = wordle.correct.toUpperCase().split("");
    const excluded = wordle.excluded.toUpperCase().split("");

    if (correct.includes(props?.label)) {
      return "bg-green-400  text-white";
    } else if (included.includes(props?.label)) {
      return "bg-amber-400  text-white";
    } else if (excluded.includes(props?.label)) {
      return "bg-neutral-400 text-white";
    } else {
      return "bg-neutral-200 text-neutral-500";
    }
  }, [wordle.included, wordle.correct, wordle.excluded]);

  return (
    <div>
      <Button
        className={cn(
          `${backgroundState} w-6 h-8 text-base`,
          "md:w-10 md:h-12 md:text-md",
          "lg:w-12 lg:h-14 lg:text-xl"
        )}
      >
        {props?.label}
      </Button>
    </div>
  );
}
