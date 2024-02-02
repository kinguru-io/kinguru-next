import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/server/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await prisma.organization.create({
      data: {
        name: data.name,
        foundationDate: new Date(data.foundationDate),
        requisitesUrl: data.requisitesUrl,
        aboutCompany: data.aboutCompany,
        activitySphere: data.activitySphere.split(" "),
        logotype: data.logotype,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid data", error });
  }
  return NextResponse.json({ message: "succes" });
}
