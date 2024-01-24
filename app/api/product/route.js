import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    const search = body.name;
    // Validate if the search parameter is provided
    if (!search) {
      const products = await prisma.products.findMany();

      return NextResponse.json(products);
    }

    // Define Prisma filter options
    const filterOptions = {
      where: {
        name: {
          contains: search,
        },
      },
    };

    // Retrieve products based on filter options
    const products = await prisma.products.findMany(filterOptions);

    return NextResponse.json(products);
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
    const { productId } = await request.json();

    // Validate if productId is provided
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required for deletion" },
        { status: 400 }
      );
    }

    // Delete product by Id
    await prisma.products.delete({
      where: {
        id: productId,
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

export async function PUT(request) {
  try {
    const { productId, updatedData } = await request.json();

    // Validate if the ID and updated data are provided
    if (!productId || !updatedData) {
      return NextResponse.json(
        { error: "ID and updated data must be provided" },
        { status: 400 }
      );
    }

    // Update the product by ID
    const updatedProduct = await prisma.products.update({
      where: {
        id: productId,
      },
      data: updatedData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
