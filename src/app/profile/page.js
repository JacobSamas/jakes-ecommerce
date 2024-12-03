'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileTab from './components/ProfileTab';
import OrderHistoryTab from './components/OrderHistoryTab';
import AddressTab from './components/AddressTab';
import NotificationsTab from './components/NotificationsTab'; // Correct file name


export default function ProfilePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lightGray bg-darkBlack">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBlack text-lightGray px-6 py-16">
      <div className="container mx-auto max-w-4xl bg-lightGray text-darkBlack p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-teal mb-6">Account Settings</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-2 mb-6">
          <button
            className={`text-lg font-bold ${
              activeTab === 'profile' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('profile')}
          >
            My Profile
          </button>
          <button
            className={`text-lg font-bold ${
              activeTab === 'orders' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('orders')}
          >
            Order History
          </button>
          <button
            className={`text-lg font-bold ${
              activeTab === 'address' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('address')}
          >
            Address
          </button>
          <button
            className={`text-lg font-bold ${
              activeTab === 'notifications' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('notifications')}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && <ProfileTab user={user} />}
        {activeTab === 'orders' && <OrderHistoryTab />}
        {activeTab === 'address' && <AddressTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </div>
    </div>
  );
}
