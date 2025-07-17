import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: true,
      trim: true,
    },
    logo: {
      path: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("brand", brandSchema);

export default Brand;
