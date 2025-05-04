/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/doctors/route.ts
import dbConnect from '@/lib/mongodb';
import doctor from '@/models/doctor';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);

  const gender = searchParams.get('gender')?.trim();
  const feeMinRaw = searchParams.get('feeMin');
  const feeMaxRaw = searchParams.get('feeMax');
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = 8;

  // Build filter query
  const query: any = {};

  if (gender && gender !== '') {
    query.gender = gender;
  }

  const feeMin = parseInt(feeMinRaw || '');
  const feeMax = parseInt(feeMaxRaw || '');

  if (!isNaN(feeMin) || !isNaN(feeMax)) {
    query.consultationFee = {};
    if (!isNaN(feeMin)) query.consultationFee.$gte = feeMin;
    if (!isNaN(feeMax)) query.consultationFee.$lte = feeMax;
  }

  try {
    const totalDocs = await doctor.countDocuments(query);
    const doctors = await doctor.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    return NextResponse.json({
      message: "Success",
      data: doctors,
      totalPages: Math.ceil(totalDocs / perPage),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching doctors", error },
      { status: 500 }
    );
  }
}
