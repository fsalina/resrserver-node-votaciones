const mongoose = require("mongoose");

const vosSchema = new mongoose.Schema(
    {
        candidato:{type: ObjectId, ref: "Candidato"},
        blanco:{//registro un voto en blanco
            type: string,
            trim: true
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
    }
)