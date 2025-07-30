import { AlertTriangle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { generateSessionId, getAccountDetails } from "@/api/tmdb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthActions } from "@/stores/auth-store";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const [authState, setAuthState] = useState({ status: "loading" });
  const authActions = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");
    const approved = searchParams.get("approved");
    const denied = searchParams.get("denied");

    if (denied === "true") {
      setAuthState({
        status: "denied",
        error: "Authorization was denied. You need to approve the request to use MovieExplorer.",
      });
      return;
    }

    if (!requestToken || approved !== "true") {
      setAuthState({
        status: "error",
        error: "Invalid callback parameters. Please try logging in again.",
      });
      return;
    }

    setAuthState({ status: "loading" });

    const controller = new AbortController();
    const signal = controller.signal;
    let timeout = null;

    let sessionId = null;
    generateSessionId(requestToken, { signal })
      .then((id) => {
        sessionId = id;
        authActions.setSession(id);
        return getAccountDetails(id, { signal });
      })
      .then((user) => {
        authActions.setUser(user);
        setAuthState({ status: "success", sessionId, user });
        timeout = setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((e) => {
        if (e?.name === "CanceledError") return;
        setAuthState({
          status: "error",
          error: `Authentication failed.`,
        });
      });

    return () => {
      controller.abort();
      if (timeout) clearTimeout(timeout);
    };
  }, [searchParams, authActions, navigate]);

  const renderContent = () => {
    switch (authState.status) {
      case "loading":
        return (
          <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md border-border">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Authenticating...</h2>
              <p className="text-muted-foreground mb-4">
                We're verifying your TMDB credentials and setting up your account.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground/70">
                <p>✓ Validating request token</p>
                <p>✓ Creating secure session</p>
                <p>⏳ Fetching account details</p>
              </div>
            </CardContent>
          </Card>
        );

      case "success":
        return (
          <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md border-border">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 mx-auto text-chart-1" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to MovieExplorer!</h2>
              <p className="text-muted-foreground mb-6">
                Your TMDB account has been successfully connected.
              </p>

              {authState.user && (
                <div className="bg-accent/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={
                        authState.user.avatar?.tmdb?.avatar_path
                          ? `https://image.tmdb.org/t/p/original${authState.user.avatar.tmdb.avatar_path}`
                          : `https://0.gravatar.com/avatar/${authState.user.avatar?.gravatar?.hash}`
                      }
                      alt={authState.user.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{authState.user.name}</p>
                      <p className="text-sm text-muted-foreground">@{authState.user.username}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground/70 space-y-1">
                    <p>Session ID: {authState.sessionId?.slice(0, 20)}...</p>
                    <p>Account ID: {authState.user.id}</p>
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4">
                Redirecting you to the homepage in a few seconds...
              </p>

              <Button asChild className="w-full">
                <Link to="/">Continue to MovieExplorer</Link>
              </Button>
            </CardContent>
          </Card>
        );

      case "denied":
        return (
          <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md border-border">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <AlertTriangle className="w-16 h-16 mx-auto text-chart-4" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Authorization Denied</h2>
              <p className="text-muted-foreground mb-6">{authState.error}</p>
              <div className="space-y-3">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "error":
        return (
          <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-md border-border">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <XCircle className="w-16 h-16 mx-auto text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Failed</h2>
              <p className="text-muted-foreground mb-6">{authState.error}</p>
              <div className="bg-destructive border border-destructive/30 rounded-lg p-4 mb-6">
                <p className="text-destructive-foreground text-sm">
                  If this problem persists, please check your TMDB account status or try again
                  later.
                </p>
              </div>
              <div className="space-y-3">
                <Button className="w-full" asChild variant="outline">
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button onClick={() => window.location.reload()} className="w-full">
                  Retry Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {renderContent()}

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground/70">
            Powered by The Movie Database (TMDB) API
          </p>
        </div>
      </div>
    </div>
  );
}
