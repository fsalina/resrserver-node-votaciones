const mongoose = require("mongoose");

const sufraganteSchema = new mongoose.Schema(
    {
        run: {
            type: String,
            trim: true,
            //required: true,
            maxlength: 10,
            //unique: true
        },
        nombre: {
            type: String,
            trim: true,
           // required: true,
            maxlength: 60            
        },
        circunscripcion: {
            type: String,
            trim: true,
         //   required: true,
            maxlength: 32            
        },
        comuna: {
            type: String,
            trim: true,
        //    required: true,
            maxlength: 60
            
        },
        provincia: {
            type: String,
            trim: true,
         //   required: true,
            maxlength: 32
        },
        region: {
            type: String,
            trim: true,
        //    required: true,
            maxlength: 32
        },
        pais: {
            type: String,
            trim: true,
        //    required: true,
            maxlength: 32
        }, 
        habilitado: {
            type: Boolean,
         //   required: true            
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sufragante", sufraganteSchema);