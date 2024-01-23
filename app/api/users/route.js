import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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

const prisma2 = new PrismaClient();

async function updateUser() {
  const user = await prisma2.users.update({
    where: {
      email: "",
    },
    data: {
      email: "",
    },
  });
  return user;
}

async function deleteUser({ email }) {
  const user = await prisma2.users.delete({
    where: {
      email: email,
    },
  });

  return user;
}

async function findUser({}) {
  const email = "huluguu0202@gmail.com";
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      name: true,
      image_url: true,
    },
  });
  console.log(user);
  return user;
}

export { findUser, deleteUser, updateUser };
