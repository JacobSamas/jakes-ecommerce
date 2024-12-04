'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields.', { theme: 'dark' });
      return;
    }

    toast.success('Message sent successfully!', { theme: 'dark' });
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <div className="container mx-auto px-6 py-16 text-lightGray">
      <h1 className="text-4xl font-bold text-center text-teal mb-8">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-darkBlack p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 font-bold">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 rounded-md text-darkBlack focus:ring focus:ring-teal"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-teal text-darkBlack font-bold py-2 rounded-md hover:bg-green transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
