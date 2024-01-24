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

  return NextResponse.json({ ...newProduct, status: 201 });
}

export async function PUT(request) {
  try {
    const { order_id, updatedData } = await request.json();

    // Validate if the ID and updated data are provided
    if (!order_id || !updatedData) {
      return NextResponse.json(
        { error: "ID and updated data must be provided" },
        { status: 400 }
      );
    }

    // Update the order by ID
    const updatedOrder = await prisma.orders.update({
      where: {
        id: order_id,
      },
      data: updatedData,
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating Order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const productsWithCustomers = await prisma.orders.findMany({
      include: {
        customer: true,
        product: true,
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
