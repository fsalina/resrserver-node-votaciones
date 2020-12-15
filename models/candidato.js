const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const candidatoSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        cargo:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        region:{
            type: String,
            trim: true,
            maxlength: 50       
        },
        ciudad:{
            type: String,
            trim: true
        },
        comuna:{
            type: String,
            trim: true
        },
        partido: {
            type: ObjectId,
            ref: "Partido",
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);



module.exports = mongoose.model("Candidato", candidatoSchema);