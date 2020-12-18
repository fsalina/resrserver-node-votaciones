const mongoose = require("mongoose");


const votoSchema = new mongoose.Schema(
    {
        nomCandidato:{type: String, required: true},
        blanco:{//registro un voto en blanco
            type: String            
        }
    }
)

module.exports = mongoose.model("Voto", votoSchema);
