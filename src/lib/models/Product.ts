import mongoose, { Schema, Document } from "mongoose";

interface Product extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
});

const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default Product;
