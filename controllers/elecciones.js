const Elecciones =  require("../models/elecciones");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.crearElecciones = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields) =>{
        //check all fields
        const{
            name,
            inicio,
            fin
        } = fields;

        if( !name || !inicio || !fin){
            return res.status(400).json({
                error: "All fields are required"
            });
        }
    });

    let elecciones = new Elecciones(fields);
    elecciones.save((err, result) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(result);
    });

};