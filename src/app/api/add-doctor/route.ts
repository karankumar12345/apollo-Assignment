/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/add-doctor/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Doctor from '@/models/doctor';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const doctor = await Doctor.create(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 });
  }
}
