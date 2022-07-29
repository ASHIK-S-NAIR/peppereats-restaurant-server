import { Schema, model } from "mongoose";

interface ICategory {
  categoryName: string;
  menuList: [object];
}

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    menuList: [
      {
        menu: {
          type: Schema.Types.ObjectId,
          ref: "menu",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model<ICategory>('Category', categorySchema);
