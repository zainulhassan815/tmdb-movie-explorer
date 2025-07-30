import { Clapperboard, Home, Search } from "lucide-react";
import { NavLink } from "react-router";
import { LoginDialog } from "@/components/login/login-dialog";
import { ThemeModeToggle } from "@/components/shared/theme-toggle";
import { UserMenu } from "@/components/shared/user-menu";
import { useAuth } from "@/hooks/use-auth";

export const Header = () => {
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
    }`;

  const { sessionId, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container p-4 flex items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <Clapperboard className="h-6 w-6" />
          <span className="font-bold">MovieDB</span>
        </NavLink>
        <nav className="flex items-center gap-4 me-4">
          <NavLink to="/" className={getNavLinkClass} end>
            <Home className="w-4 h-4" />
            Home
          </NavLink>
          <NavLink to="/search" className={getNavLinkClass}>
            <Search className="w-4 h-4" /> Search
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeModeToggle />
          {!sessionId && <LoginDialog />}
          {user && <UserMenu user={user} onLogoutClick={logout} />}
        </div>
      </div>
    </header>
  );
};
