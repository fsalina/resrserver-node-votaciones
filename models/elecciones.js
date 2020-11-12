const mongoose = require("mongoose");


const eleccionesSchema = new mongoose.Schema(
    {
        name:{
            type: string,
            trim: true,
            required: true,
            maxlength: 100
        },
        inicio:{
            type: Date,
            required: true
        },
        fin:{
            type: Date,
            required: true
        }

    },
    { timestamps: true }
);



module.exports = mongoose.model("Elecciones", userSchema);