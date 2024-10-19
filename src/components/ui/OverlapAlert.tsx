import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function OverlapAlert() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="font-bold">Error</AlertTitle>
      <AlertDescription>
        Characters from included and correct inputs must not be simultaneously
        present in the excluded input.
      </AlertDescription>
    </Alert>
  );
}
