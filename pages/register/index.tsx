'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { showErrorToast } from '../components/ToastNotify';
import { Switch } from '@/components/ui/switch';
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

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode and save it to localStorage
  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[@$!%*?&#]/.test(password),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!Object.values(passwordCriteria).every(Boolean)) {
      showErrorToast('Please meet all password criteria.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, navigate to the login page
        router.push('/login');
      } else {
        showErrorToast(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
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
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
            <CardDescription className="text-sm mt-1">
              Create a new account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`${
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
                  />
                </div>
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    required
                    className={`${
                      darkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-gray-100 text-black border-gray-300'
                    }`}
                  />
                </div>
                <ul className="text-sm mt-2 space-y-1">
                  <li
                    className={passwordCriteria.length ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must be at least 8 characters long
                  </li>
                  <li
                    className={passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain an uppercase letter
                  </li>
                  <li
                    className={passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain a lowercase letter
                  </li>
                  <li
                    className={passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain a special character (@, $, !, %, *, ?, &)
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4 px-6 pb-6">
              <Button
                className="w-full py-2 font-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <p className="text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className={`font-medium ${
                    darkMode
                      ? 'text-blue-400 hover:underline'
                      : 'text-blue-600 hover:underline'
                  }`}
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
