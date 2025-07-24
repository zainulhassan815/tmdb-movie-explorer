import { AlertTriangle, CheckCircle, Film, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthCallback() {
  const { request_token: requestToken, approved, denied } = useSearchParams();

  const renderContent = () => {
    switch (authState.status) {
      case "loading":
        return (
          <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Loader2 className="w-16 h-16 mx-auto text-purple-400 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Authenticating...</h2>
              <p className="text-white/70 mb-4">
                We're verifying your TMDB credentials and setting up your account.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                <p>✓ Validating request token</p>
                <p>✓ Creating secure session</p>
                <p>⏳ Fetching account details</p>
              </div>
            </CardContent>
          </Card>
        );

      case "success":
        return (
          <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to MovieExplorer!</h2>
              <p className="text-white/70 mb-6">
                Your TMDB account has been successfully connected.
              </p>

              {authState.user && (
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={getAvatarUrl(authState.user) || "/placeholder.svg"}
                      alt={authState.user.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-white">{authState.user.name}</p>
                      <p className="text-sm text-white/70">@{authState.user.username}</p>
                    </div>
                  </div>
                  <div className="text-xs text-white/50 space-y-1">
                    <p>Session ID: {authState.sessionId?.slice(0, 20)}...</p>
                    <p>Account ID: {authState.user.id}</p>
                  </div>
                </div>
              )}

              <p className="text-sm text-white/50 mb-4">
                Redirecting you to the homepage in a few seconds...
              </p>

              <Link href="/">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Continue to MovieExplorer
                </Button>
              </Link>
            </CardContent>
          </Card>
        );

      case "denied":
        return (
          <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <AlertTriangle className="w-16 h-16 mx-auto text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Authorization Denied</h2>
              <p className="text-white/70 mb-6">{authState.error}</p>
              <div className="space-y-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Return to Homepage
                  </Button>
                </Link>
                <Button
                  onClick={() => router.push("/")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "error":
        return (
          <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <XCircle className="w-16 h-16 mx-auto text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Authentication Failed</h2>
              <p className="text-white/70 mb-6">{authState.error}</p>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">
                  If this problem persists, please check your TMDB account status or try again
                  later.
                </p>
              </div>
              <div className="space-y-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Return to Homepage
                  </Button>
                </Link>
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">MovieExplorer</h1>
          </div>
          <p className="text-white/70">Connecting your TMDB account</p>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/50">Powered by The Movie Database (TMDB) API</p>
        </div>
      </div>
    </div>
  );
}
