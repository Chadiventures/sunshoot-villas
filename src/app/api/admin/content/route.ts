import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAuthenticated } from "@/lib/admin-auth";
import {
  readVillaContent,
  writeVillaContent,
  type VillaContentStore,
} from "@/lib/villa-content";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  return isAuthenticated(session);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = readVillaContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as VillaContentStore;
  writeVillaContent(body);
  return NextResponse.json({ success: true });
}
