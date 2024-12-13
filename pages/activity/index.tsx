

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

type Activity = {
  action: string;
  timestamp: string;
};

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3002/user/activity', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          const sortedActivities = data.activityLog.sort(
            (a: Activity, b: Activity) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          setActivities(sortedActivities); // Assuming the backend response includes "activityLog"
        } else {
          throw new Error('Failed to fetch activity log');
        }
      } catch (err) {
        console.error('Error fetching activity log:', err);
        setError('Unable to load activity log. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#171717] text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto p-4 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className={`flex items-center text-sm ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        <Card
          className={`${
            darkMode
              ? 'bg-[#171717] text-white border border-gray-700'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : activities.length > 0 ? (
              <ul className="space-y-4">
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    className={`pb-4 border-b last:border-b-0 last:pb-0 ${
                      darkMode ? 'border-gray-700' : 'border-gray-300'
                    }`}
                  >
                    <p className="font-medium">{activity.action}</p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activities found.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
