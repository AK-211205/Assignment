'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

type Activity = {
    action: string;
    timestamp: string;
  };
  

export default function ActivityPage() {
  
  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-background text-foreground">
      <Header darkMode={false} toggleDarkMode={() => {}} />
      <main className="container mx-auto p-4 max-w-3xl">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        <Card>
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
                  <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">
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
