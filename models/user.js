const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");


const userSchema = new mongoose.Schema(
    {
        name:{
            type: stringify,
            trim: true,
            required: true,
            maxlength: 32
        },
        rut:{
            type: string,
            require: true,
            maxlength: 10
        },
        nacimiento:{
            type: Date,
            require: true
        },
        email:{
            type: string,
            trim: true,
            required: true,
            unique: true
        },
        hashed_password:{
            type: string,
            required: true
        },
        region:{
            type: string,
            trim: true,
            required: true
        },
        ciudad:{
            type: string,
            trim: true,
            required: true
        },
        comuna:{
            type: string,
            trim: true,
            required: true
        },
        salt: String,//es para hacer la encriptacion
        role: {
            type: Number,
            default: 0
        },
        habilitado: {
            type: Boolean
        }
    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// schemas methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);