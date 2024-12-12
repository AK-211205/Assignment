
// 'use client'

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, Settings, Lock, ChevronDown, ChevronUp } from 'lucide-react';
// import { Header } from '../components/Header';

// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"

// export default function UserProfilePage() {
//   const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
//   const [languagePrefsOpen, setLanguagePrefsOpen] = useState(false);
//   const [securityOpen, setSecurityOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [language, setLanguage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Load dark mode state from localStorage
//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedDarkMode);
//   }, []);

//   // Fetch user data and validate token
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('http://localhost:3002/user/details', {
//           method: 'GET',
//           credentials: 'include', // Include cookies in the request
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setName(data.user.name);
//           setEmail(data.user.email);
//           setLanguage(data.user.preferences?.defaultLanguage || ''); // Set language from API response
//         } else {
//           // If the token is invalid, redirect to login
//           router.push('/login');
//         }
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   const handleLogout = async () => {
//     try {
//       await fetch('http://localhost:3002/user/logout', {
//         method: 'POST',
//         credentials: 'include', // Include cookies in the request
//       });
//       router.push('/login'); // Redirect to login after logout
//     } catch (err) {
//       console.error('Error during logout:', err);
//     }
//   };

//   const handleClick = () => {
//     router.push('/change-password'); // Change to the desired route
//   };

//   const toggleDarkMode = () => {
//     const newDarkModeState = !darkMode;
//     setDarkMode(newDarkModeState);
//     localStorage.setItem('darkMode', newDarkModeState.toString());
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
//       <div className="bg-background text-foreground">
//         <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//         <main className="container mx-auto p-4 max-w-3xl">
//           <div className="flex justify-end mb-4">
//             <Button onClick={handleLogout} variant="outline">Logout</Button>
//           </div>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium flex items-center">
//                 <User className="mr-2" size={18} />
//                 Personal Information
//               </CardTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setPersonalInfoOpen(!personalInfoOpen)}
//               >
//                 {personalInfoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </Button>
//             </CardHeader>
//             {personalInfoOpen && (
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="text-sm font-medium">Name</label>
//                     <input 
//                       id="name"
//                       type="text" 
//                       value={name} 
//                       onChange={(e) => setName(e.target.value)}
//                       className="w-full mt-1 p-2 border rounded-md bg-background"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="text-sm font-medium">Email</label>
//                     <input 
//                       id="email"
//                       type="email" 
//                       value={email} 
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full mt-1 p-2 border rounded-md bg-background"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             )}
//           </Card>

//           <Card className="mt-6">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium flex items-center">
//                 <Settings className="mr-2" size={18} />
//                 Language Preferences
//               </CardTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setLanguagePrefsOpen(!languagePrefsOpen)}
//               >
//                 {languagePrefsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </Button>
//             </CardHeader>
//             {languagePrefsOpen && (
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
                   
//                     <p className="mt-1 text-sm">{language || 'Not set'}</p> {/* Display the language directly */}
//                   </div>
//                 </div>
//               </CardContent>
//             )}
//           </Card>

//           <Card className="mt-6">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium flex items-center">
//                 <Lock className="mr-2" size={18} />
//                 Security
//               </CardTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setSecurityOpen(!securityOpen)}
//               >
//                 {securityOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </Button>
//             </CardHeader>
//             {securityOpen && (
//               <CardContent>
//                 <div className="space-y-4">
//                   <Button variant="outline" className="w-full" onClick={handleClick}>Change Password</Button>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium">Two-Factor Authentication</span>
//                     <Switch />
//                   </div>
//                 </div>
//               </CardContent>
//             )}
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '../components/Header';
import {showSuccessToast, showErrorToast} from '../components/ToastNotify'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function UserProfilePage() {
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [languagePrefsOpen, setLanguagePrefsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('');
  const [preferences, setPreferences] = useState({
    defaultLanguage: '', // preferences object with defaultLanguage key
    darkMode: false,
    textSize: 'medium', // default text size
  });
  const [loading, setLoading] = useState(false); // Loading state for saving updates
  const router = useRouter();

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Fetch user data and validate token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3002/user/details', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.user.name);
          setEmail(data.user.email);
          setLanguage(data.user.preferences?.defaultLanguage || ''); // Set language from API response
          setPreferences({
            ...data.user.preferences, // Set preferences from API response
          });
        } else {
          router.push('/login');
        }
      } catch (err) {
        showErrorToast(err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3002/user/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      router.push('/login'); // Redirect to login after logout
    } catch (err) {
      console.error('Error during logout:', err);
      showErrorToast(err)
    }
  };

  const handleClick = () => {
    router.push('/change-password'); // Change to the desired route
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  const handleUpdate = async () => {
    setLoading(true); // Set loading state while updating
    try {
      const response = await fetch('http://localhost:3002/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          preferences, // Send the preferences object (including language)
        }),
        credentials: 'include', // Send updated data with the cookies
      });

      const data = await response.json();

      if (response.ok) {
        
        showSuccessToast('Profile updated successfully!')
      } else {
        showErrorToast(data.message || 'Error updating profile')
        
      }
    } catch (err) {
      console.error('Error during update:', err);
      
      showErrorToast('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="container mx-auto p-4 max-w-3xl">
          <div className="flex justify-end mb-4">
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
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
                    <label className="text-sm font-medium">Default Language</label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setPreferences((prevPreferences) => ({
                          ...prevPreferences,
                          defaultLanguage: e.target.value, // Update the preferences object
                        }));
                      }}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
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
                  <Button variant="outline" className="w-full" onClick={handleClick}>Change Password</Button>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="mt-4 flex justify-end">
            <Button onClick={handleUpdate} variant="outline" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
