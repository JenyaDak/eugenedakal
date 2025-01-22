import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Product from "../../../lib/models/Product";

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find();

    if (products.length === 0) {
      console.log("No products found in the database.");
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}
