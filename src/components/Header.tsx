'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <header className="flex justify-between items-center p-4 bg-orange-600 text-white shadow-md">
      <h1 className="text-xl font-bold">Doctor Dashboard</h1>
      <nav className="flex gap-4">
        <Link href="/">
          <span className={`cursor-pointer ${isActive('/') ? 'underline' : ''}`}>
            All Doctors
          </span>
        </Link>
        <Link href="/add-doctor">
          <span className={`cursor-pointer ${isActive('/add-doctor') ? 'underline' : ''}`}>
            Add Doctor
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
