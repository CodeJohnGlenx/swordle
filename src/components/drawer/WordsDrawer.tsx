import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type WordsDrawerProps = {
  onSwordle?: () => void;
  words?: string[];
};

export default function WordsDrawer(props: WordsDrawerProps) {
  return (
    <Drawer>
      <div className="grid justify-items-center my-4">
        <DrawerTrigger onClick={props.onSwordle}>
          <span
            className={cn(
              "text-base py-4 px-8 bg-green-500 font-bold text-white hover:bg-green-600 rounded",
              "md:text-xl py-4 px-12"
            )}
          >
            Swordle!
          </span>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={cn("text-lg", "md:text-xl")}>
            Word Suggestions
          </DrawerTitle>
          <DrawerDescription>
            <p className={cn("text-md", "md:text-lg")}>
              Here are some words that might be useful.
            </p>

            <div className="flex flex-row flex-wrap gap-4 mt-8 overflow-y-auto">
              {props.words?.map((word, i) => (
                <Badge
                  variant="outline"
                  key={i}
                  className={cn(
                    "text-md hover:opacity-50 py-1 px-3",
                    "lg:text-lg lg:py-2 lg:px-6"
                  )}
                >
                  <span>{word}</span>
                </Badge>
              ))}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row flex-wrap gap-4">
          <Button className={cn("text-md py-4", "lg:text-lg lg:py-6")} onClick={props.onSwordle}>
            <span>
              <svg
                className="w-6 h-6 text-white dark:text-white me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.484 9.166 15 7h5m0 0-3-3m3 3-3 3M4 17h4l1.577-2.253M4 7h4l7 10h5m0 0-3 3m3-3-3-3"
                />
              </svg>
            </span>
            Suggest other words
          </Button>
          <DrawerClose>
            <Button
              variant="outline"
              className={cn("text-md py-4", "lg:text-lg lg:py-6")}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
