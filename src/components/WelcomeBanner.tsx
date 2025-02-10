import React, { useEffect, useState } from 'react';
import { useStore } from '../store';

export function WelcomeBanner() {
  const { userSettings } = useStore();
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    };

    setMessage(`${getGreeting()}${userSettings.name ? `, ${userSettings.name}` : ''}!`);

    const messageTimer = setTimeout(() => {
      setMessage('Have an amazing day ahead! 🌟');
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(hideTimer);
    };
  }, [userSettings.name]);

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 text-center text-sm font-medium animate-fade-in-down">
      {message}
    </div>
  );
}