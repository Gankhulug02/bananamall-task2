import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { z } from "zod";

const createOrderSchema = z.object({
  customer_id: z.string(),
  product_id: z.string(),
  status: z.string(),
  amount: z.number(),
  total: z.number(),
});

export async function POST(request) {
  const { amount, total, customer_id, product_id, status } =
    await request.json();

  const body = {
    amount: Number(amount),
    total: Number(total),
    status,
    customer_id,
    product_id,
  };

  const validation = createOrderSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.orders.create({
    data: body,
  });
  console.log(newProduct);

  return NextResponse.json({ ...newProduct, status: 201 });
}

export async function GET() {
  try {
    const productsWithCustomers = await prisma.orders.findMany({
      include: {
        customer: true,
      },
    });

    return NextResponse.json(productsWithCustomers);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json(
        { error: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    // Delete product by Id
    await prisma.orders.delete({
      where: {
        id: order_id,
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      code: 200,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
