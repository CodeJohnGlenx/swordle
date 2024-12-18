"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

import { REGEXP_ONLY_CHARS } from "input-otp";
import { use, useEffect, useMemo, useState } from "react";
import { Label } from "../ui/label";

type OtpInputProps = {
  initialLength?: number;
  maxLength?: number;
  inputType?: string | "correct" | "excluded" | "included";
  onChange?: (text: string) => void;
};

type OtpGroupProps = {
  startIndex?: number;
  numSlots?: number;
  inputType?: string;
};

export default function OtpInput(props: OtpInputProps) {
  const [text, setText] = useState("");
  const [minLength, setMinLength] = useState(props?.initialLength || 5);
  const [maxLength, setMaxLength] = useState(props?.maxLength || 5);
  const [inputType, setInputType] = useState(props?.inputType || ""); // included, excluded, correct
  const regexChoice = useMemo(() => {
    if (inputType === "correct") {
      return "^[a-zA-Z_]+$";
    } else {
      return REGEXP_ONLY_CHARS;
    }
  }, []);

  const label = useMemo(() => {
    if (inputType === "correct") {
      return "orrect letters";
    } else if (inputType === "excluded") {
      return "xcluded letters";
    } else if (inputType === "included") {
      return "ncluded letters";
    } else {
      return "";
    }
  }, [inputType]);

  const firstLetterLabel = useMemo(() => {
    if (inputType === "correct") {
      return "C";
    } else if (inputType === "excluded") {
      return "E";
    } else if (inputType === "included") {
      return "I";
    } else {
      return "";
    }
  }, [inputType]);

  const firstLetterStyleLabel = useMemo(() => {
    if (inputType === "correct") {
      return "bg-green-400 text-white";
    } else if (inputType === "excluded") {
      return "bg-neutral-400 text-white";
    } else if (inputType === "included") {
      return "bg-amber-400 text-white";
    }
  }, [inputType]);

  return (
    <div className="flex flex-col gap-1">
      <Label className={cn("text-lg")}>
        <span className={cn(firstLetterStyleLabel, "p-1 px-2 me-1 rounded font-bold")}>{firstLetterLabel}</span>
        {label}
      </Label>

      <InputOTP
        minLength={minLength}
        maxLength={maxLength}
        pattern={regexChoice}
        onChange={(text) => {
          setText(text);
          props?.onChange && props?.onChange(text);
        }}
        inputMode="text"
      >
        <div className={cn("flex flex-col gap-2")}>
          {text.length >= 0 && (
            <OtpGroup numSlots={5} startIndex={0} inputType={inputType} />
          )}

          {text.length > 5 && (
            <OtpGroup numSlots={5} startIndex={5} inputType={inputType} />
          )}

          {text.length > 10 && (
            <OtpGroup numSlots={5} startIndex={10} inputType={inputType} />
          )}

          {text.length > 15 && (
            <OtpGroup numSlots={5} startIndex={15} inputType={inputType} />
          )}
        </div>
      </InputOTP>
    </div>
  );
}

function OtpGroup(props: OtpGroupProps) {
  const [slots, setSlots] = useState(props.numSlots || 1);
  const [startIndex, setStartIndex] = useState(props.startIndex || 0);
  const [slotsArray, setSlotsArray] = useState(
    Array.from({ length: slots }, (_, i) => 0)
  );

  return (
    <InputOTPGroup>
      {slotsArray.map((_, i) => (
        <InputOTPSlot
          key={i}
          index={startIndex + i}
          className={cn(
            "p-6 text-lg uppercase font-bold",
            "md:p-8 md:text-2xl",
            "lg:p-8 lg:text-3xl"
          )}
        />
      ))}
    </InputOTPGroup>
  );
}

// px-[2rem] py-[1.5rem] text-[2rem]
