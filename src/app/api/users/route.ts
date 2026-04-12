import { getUsers } from '@/lib/dataService';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users, { status: 200 });
}
