/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import api from '@/utils/api';
import Head from 'next/head';

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    name: '', specialization: '', experience: '', consultationFee: '', rating: '', gender: '', imageUrl: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await api.post('/add-doctor', {
      ...form,
      experience: Number(form.experience),
      consultationFee: Number(form.consultationFee),
      rating: Number(form.rating)
    });
  };

  return (
    <>
      <Head>
        <title>Add Doctor - Apollo Clone</title>
      </Head>

      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <div
          className="w-full max-w-lg bg-white p-8 rounded-lg"
          style={{
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(255, 165, 0, 0.3), 0 4px 30px rgba(0, 123, 255, 0.15)',
          }}
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add New Doctor</h2>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {Object.entries(form).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
