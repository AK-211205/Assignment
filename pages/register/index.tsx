'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { showErrorToast} from '../components/ToastNotify'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  })
  const router = useRouter()

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[@$!%*?&#]/.test(password),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // setError('')
    setLoading(true)

    if (!Object.values(passwordCriteria).every(Boolean)) {
      showErrorToast('Please meet all password criteria.');
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3002/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Registration successful, navigate to the login page
        router.push('/login')
      } else {
        // Handle errors returned by the API
        // setError(data.message || 'Registration failed. Please try again.')
        showErrorToast(data.message || 'Registration failed. Please try again');
      }
    } catch (err) {
      // Handle network or other unexpected errors
      console.log(err);
      showErrorToast(err);
      // setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Create a password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <ul className="text-sm mt-2 space-y-1">
                <li className={passwordCriteria.length ? 'text-green-500' : 'text-red-500'}>Password must be at least 8 characters long</li>
                <li className={passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}>Password must contain an uppercase letter</li>
                <li className={passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}>Password must contain a lowercase letter</li>
                <li className={passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}>Password must contain a special character (@, $, !, %, *, ?, &)</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <p className="mt-2 text-sm text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
