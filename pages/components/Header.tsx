
import React from 'react';
import Link from 'next/link';
import { Moon, Sun, Activity } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-background z-10 py-4 border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg font-bold">
              AK
            </div>
            {/* <h1 className="text-xl font-bold">Aaliya Khadija</h1> */}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/activity" className="flex items-center space-x-2 text-sm font-medium">
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`rounded-full p-1 ${
                  darkMode ? 'border-2 border-gray-500' : ''
                }`} // Add border in dark mode
              />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
