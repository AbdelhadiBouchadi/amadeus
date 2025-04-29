import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Check,
  ChevronsUpDown,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface UserButtonProps {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export function UserButton({ email, name, image }: UserButtonProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="flex gap-4 items-center w-full p-4 rounded-lg hover:bg-subMain group transition-colors text-primary dark:text-main">
          <Avatar className="group-hover:bg-main">
            {image ? (
              <AvatarImage
                src={image}
                alt="Profile image"
                className="w-10 h-10 object-cover object-center"
              />
            ) : (
              <AvatarFallback>
                {name ? (
                  <span className="group-hover:text-secondary-foreground">
                    {' '}
                    {name.charAt(0).toUpperCase()}{' '}
                  </span>
                ) : (
                  <User className="w-10 h-10 p-2 rounded-full text-secondary-foreground group-hover:text-primary dark:group-hover:text-main" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold group-hover:text-primary dark:group-hover:text-main text-secondary-foreground truncate">
              {name || 'User'}
            </p>
          </div>
          <ChevronsUpDown
            size={16}
            strokeWidth={2}
            className="text-secondary-foreground group-hover:text-primary dark:group-hover:text-main"
            aria-hidden="true"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold text-foreground">
            {name || 'User'}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email || 'No email'}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer font-bold">
            <Monitor className="mr-2 size-4" />
            Mode
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="font-bold">
              <DropdownMenuItem
                onClick={() => setTheme('system')}
                className="cursor-pointer"
              >
                <Monitor className="mr-2 size-4" />
                System default
                {theme === 'system' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('light')}
                className="cursor-pointer"
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === 'light' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme('dark')}
                className="cursor-pointer"
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === 'dark' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/settings"
              className="flex items-center gap-2 font-bold"
            >
              <Settings
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 cursor-pointer font-bold"
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
