import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

const prisma2 = new PrismaClient();

// model Products {
//   id        String   @id @default(uuid())
//   name      String   @db.VarChar(255)
//   image_url String   @default("https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") @db.VarChar(255)
//   Price     Int      @db.Int
//   Orders    Orders[]
// }

const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number(),
});

export async function POST(request) {
  const body = await request.json();
  const validation = createProductSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.products.create({
    data: {
      name: body.name,
      Price: body.price,
    },
  });

  return NextResponse.json({ ...newProduct, status: 201 });
}

async function deleteProduct({ id }) {
  const product = await prisma.products.delete({
    where: {
      id: id,
    },
  });

  return product;
}

async function findProduct({ name }) {
  const product = await prisma.products.findUnique({
    where: {
      name: name,
    },
  });
  return product;
}

export { findProduct, deleteProduct };
