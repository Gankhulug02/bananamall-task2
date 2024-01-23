import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

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

export async function GET() {
  try {
    const products = await prisma.products.findMany();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
