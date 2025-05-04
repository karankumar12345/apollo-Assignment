/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import {  FaRupeeSign, FaVenusMars } from 'react-icons/fa';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  rating: number;
  gender: string;
  imageUrl: string;
}

export default function DestinationPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({ gender: '', feeMin: '', feeMax: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async () => {
    const { gender, feeMin, feeMax } = filters;
    const res = await api.get('/doctors', {
      params: { gender, feeMin, feeMax, page }
    });
    setDoctors(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 md:px-10 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Explore General Physicians</h1>
        <p className=" text-lg">Search and consult with trusted doctors</p>
      </header>

      {/* Filters */}
      <section className="mb-10 bg-white rounded-2xl shadow-lg p-6 grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaVenusMars className="text-blue-600" /> Gender
          </label>
          <select
            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaRupeeSign className="text-green-600" /> Min Fee
          </label>
          <input
            type="number"
            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. 200"
            value={filters.feeMin}
            onChange={(e) => setFilters({ ...filters, feeMin: e.target.value })}
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FaRupeeSign className="text-green-600" /> Max Fee
          </label>
          <input
            type="number"
            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. 1000"
            value={filters.feeMax}
            onChange={(e) => setFilters({ ...filters, feeMax: e.target.value })}
          />
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="grid gap-8 md:grid-cols-3  sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-xl p-5 shadow-[0px_0px_48px_-6px_#ff24e1b3] hover:scale-[1.02] transition duration-300"
          >
            <img
              src={doc.imageUrl || '/doctor-placeholder.jpg'}
              alt={doc.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>
            <p className="text-sm text-blue-600 font-medium">{doc.specialization}</p>
            <p className="text-sm text-gray-500 mt-1">Experience: {doc.experience} yrs</p>
            <p className="text-sm text-gray-700">Fee: ₹{doc.consultationFee}</p>
            <p className="text-sm text-yellow-500 font-medium">⭐ {doc.rating}</p>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-6">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-40"
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold">{page} / {totalPages}</span>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-40"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
