import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    const search = body.name;
    // Validate if the search parameter is provided
    if (!search) {
      return NextResponse.json(
        { error: "Search parameter is required" },
        { status: 400 }
      );
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
