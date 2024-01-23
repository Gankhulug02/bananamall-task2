import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createUserSchema = z.object({
  id: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export async function POST(request) {
  const body = await request.json();

  const validation = createUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newUser = await prisma.users.create({
    data: {
      id: body.id,
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}

const getUserSchema = z.object({
  name: z.string().min(1).max(255),
});

export async function GET(request) {
  const body = await request.json();

  console.log("asdasd");

  const validation = getUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.users.findUnique({
    where: {
      email: body.email,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
