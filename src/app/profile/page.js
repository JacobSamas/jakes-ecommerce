'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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
            className={`text-lg font-bold ${activeTab === 'profile' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'}`}
            onClick={() => handleTabChange('profile')}
          >
            My Profile
          </button>
          <button
            className={`text-lg font-bold ${activeTab === 'orders' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'}`}
            onClick={() => handleTabChange('orders')}
          >
            Order History
          </button>
          <button
            className={`text-lg font-bold ${activeTab === 'address' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'}`}
            onClick={() => handleTabChange('address')}
          >
            Address
          </button>
          <button
            className={`text-lg font-bold ${activeTab === 'notifications' ? 'text-teal border-b-2 border-teal' : 'text-gray-500'}`}
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

function ProfileTab({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!', { theme: 'dark' });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal focus:border-teal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal focus:border-teal"
          value={email}
          placeholder="Your email"
          disabled
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal text-white font-bold py-2 rounded-md hover:bg-green transition"
      >
        Update Profile
      </button>
    </form>
  );
}

function OrderHistoryTab() {
  const orders = [
    { id: '12345', date: '2024-11-01', total: '$150.00', items: 3 },
    { id: '67890', date: '2024-10-15', total: '$80.00', items: 1 },
  ];

  return (
    <div>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border-b pb-4">
              <p className="font-bold">Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Total: {order.total}</p>
              <p>Items: {order.items}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
}

function AddressTab() {
  const addresses = ['123 Main Street, Springfield', '456 Elm Street, Shelbyville'];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>
      {addresses.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {addresses.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
}

function NotificationsTab() {
  const notifications = [
    'Your order #12345 has been shipped.',
    'Your profile was updated successfully.',
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Notifications</h3>
      {notifications.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
}
