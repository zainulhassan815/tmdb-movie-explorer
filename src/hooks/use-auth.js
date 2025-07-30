import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { getAccountDetails } from "@/api/tmdb";
import { useAuthActions, useSessionId, useUser } from "@/stores/auth-store";

export const useAuth = () => {
  const user = useUser();
  const sessionId = useSessionId();
  const authActions = useAuthActions();

  const logout = useCallback(() => authActions.clearSession(), [authActions]);

  const { data } = useQuery({
    queryKey: ["user", sessionId],
    queryFn: () => getAccountDetails(sessionId),
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (data) authActions.setUser(data);
  }, [data, authActions]);

  return {
    user,
    sessionId,
    logout,
  };
};
