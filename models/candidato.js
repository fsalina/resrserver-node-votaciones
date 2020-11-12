const mongoose = require("mongoose");


const candidatoSchema = new mongoose.Schema(
    {
        name:{
            type: string,
            trim: true,
            required: true,
            maxlength: 32
        },
        cargo:{
            type: string,
            trim: true,
            required: true,
            maxlength: 50
        },
        region:{
            type: string,
            trim: true       
         },
        ciudad:{
            type: string,
            trim: true
        },
        comuna:{
            type: string,
            trim: true
        },

    },
    { timestamps: true }
);



module.exports = mongoose.model("Candidato", userSchema);