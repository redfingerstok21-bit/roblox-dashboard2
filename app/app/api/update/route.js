import { NextResponse } from 'next/server';

global.accountData = global.accountData || {};

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Verifikasi password keamanan
    if (body.pass !== "AKUN_SAYA_SAJA_123") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    global.accountData[body.username] = {
      username: body.username,
      income: body.income,
      money: body.money,
      speed: body.speed,
      equippedPetsCount: body.equippedPetsCount,
      pets: body.pets,
      updatedAt: Date.now()
    };

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(global.accountData);
}
