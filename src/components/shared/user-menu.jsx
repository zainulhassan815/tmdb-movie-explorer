import { Bookmark, Heart, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserMenu = ({
  user,
  onFavoritesClick,
  onWatchlistClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                user.avatar?.tmdb?.avatar_path
                  ? `https://image.tmdb.org/t/p/original${user.avatar.tmdb.avatar_path}`
                  : `https://0.gravatar.com/avatar/${user.avatar?.gravatar?.hash}`
              }
              alt={user.name}
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {(user.name || user.username)
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col gap-2">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onFavoritesClick}>
          <Heart />
          <span>My Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onWatchlistClick}>
          <Bookmark />
          <span>My Watchlist</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onProfileClick}>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onSettingsClick}>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer">
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
