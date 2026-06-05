import mongose from 'mongoose';

const userSchema = new mongose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cartData: {
            type: Object,
            default: {},
        },
    }
);

export const userModel = mongose.model('User', userSchema) || mongose.models.User;