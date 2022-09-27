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
      unique: true,
      maxlength: 32,
    },
    menuList: [
      {
        menuId: {
          type: Schema.Types.ObjectId,
          ref: "Menu",
        },
        menuName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model<ICategory>("Category", categorySchema);
