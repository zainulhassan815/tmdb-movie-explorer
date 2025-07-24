import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ErrorMessage = ({
  title,
  message,
  retryButtonTitle = "Retry",
  onRetry,
  className,
  ...props
}) => {
  return (
    <Card
      className={cn("w-full p-4 gap-2 max-w-md mx-auto text-center shadow-lg", className)}
      {...props}
    >
      <CardHeader>
        <div className="flex flex-col items-center">
          <AlertTriangle className="text-destructive w-8 h-8 mb-2" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{message}</p>
        <Button onClick={onRetry} variant="destructive">
          {retryButtonTitle}
        </Button>
      </CardContent>
    </Card>
  );
};
