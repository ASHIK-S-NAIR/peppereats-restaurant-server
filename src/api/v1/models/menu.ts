import {Schema, model} from 'mongoose';

interface IMenu {
    menuName: String,
    menuCategory: Object,
    menuPrice: Number,
    menuDescription: String,
    menuImage: Object,
}

const menuSchema = new Schema<IMenu>({
    menuName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32
    },
    menuCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    menuPrice: {
        type: Number,
        required: true
    },
    menuDescription: {
        type: String,
        required: true,
        maxlength: 500
    },
    menuImage: {
        publicId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {timestamps: true})

module.exports = model<IMenu>("Menu", menuSchema);