import { ExternalLink, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { generateRequestToken } from "@/api/tmdb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function LoginDialog() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const token = await generateRequestToken();
      const redirectTo = encodeURIComponent(`${window.location.origin}/callback`);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${redirectTo}`;
    } catch (err) {
      console.error("Login failed", err);
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>Login</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to MovieExplorer</DialogTitle>
          <DialogDescription>
            Sign in with your TMDB account to access personalized features
          </DialogDescription>
        </DialogHeader>

        <Button type="button" onClick={handleLogin} disabled={isLoading}>
          {isLoading && <Loader2Icon className="animate-spin" />}
          Login with your TMDB Account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="py-1 px-3 bg-secondary rounded-full">Don't have an account?</span>
          </div>
        </div>

        <Button asChild type="button" variant="link">
          <a href="https://www.themoviedb.org/signup" target="_blank" rel="noopener noreferrer">
            <ExternalLink />
            Create TMDB Account
          </a>
        </Button>

        <p className="w-full text-center text-xs">
          By signing in, you agree to TMDB's{" "}
          <a
            href="https://www.themoviedb.org/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://www.themoviedb.org/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
