import React, { useState } from 'react';
import { User, Settings, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from './components/Header';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

export default function UserProfilePage() {
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [languagePrefsOpen, setLanguagePrefsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("Aaliya Khadija");
  const [email, setEmail] = useState("aaliya.khadija@example.com");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would also apply the dark mode class to the root element
    // and store the preference in local storage or a backend
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto p-4 max-w-3xl">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <User className="mr-2" size={18} />
                Personal Information
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPersonalInfoOpen(!personalInfoOpen)}
              >
                {personalInfoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CardHeader>
            {personalInfoOpen && (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input 
                      id="name"
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md bg-background"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Settings className="mr-2" size={18} />
                Language Preferences
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguagePrefsOpen(!languagePrefsOpen)}
              >
                {languagePrefsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CardHeader>
            {languagePrefsOpen && (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Translation Language</label>
                    <Select>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Lock className="mr-2" size={18} />
                Security
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSecurityOpen(!securityOpen)}
              >
                {securityOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CardHeader>
            {securityOpen && (
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">Change Password</Button>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}

