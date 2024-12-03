'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ProfileTab({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!', { theme: 'dark' });
  };

  return (
    <form onSubmit={handleUpdate}>
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal"
          value={email}
          placeholder="Your email"
          disabled
        />
      </div>

      {/* Update Button */}
      <button
        type="submit"
        className="w-full bg-teal text-white font-bold py-2 rounded-md hover:bg-green transition"
      >
        Update Profile
      </button>
    </form>
  );
}
