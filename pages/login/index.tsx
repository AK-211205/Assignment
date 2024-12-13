

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { showErrorToast } from '../components/ToastNotify';
import { Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  return (
    <header
      className={`sticky top-0 z-10 py-4 px-6 ${
        darkMode ? 'bg-[#171717] text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex justify-end">
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`rounded-full p-1 ${
                  darkMode ? 'border-2 border-gray-500' : ''
                }`}
              />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </header>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensures cookies are sent with the request
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to the profile page
        router.push('/profile');
      } else {
        showErrorToast(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      showErrorToast('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#171717] text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Header with dark mode toggle */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card
          className={`w-[450px] shadow-lg ${
            darkMode
              ? 'bg-[#171717] text-white border border-gray-700'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="text-sm mt-1">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className={`${
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className={`${
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 px-6 pb-6">
              <Button
                className="w-full py-2 font-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <p className="text-sm">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className={`font-medium ${
                    darkMode
                      ? 'text-blue-400 hover:underline'
                      : 'text-blue-600 hover:underline'
                  }`}
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
