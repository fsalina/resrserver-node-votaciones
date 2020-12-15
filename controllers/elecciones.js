const Elecciones =  require("../models/elecciones");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.crearElecciones = (req, res) =>{
    
    let data = req.body;
    const elecciones = new Elecciones(data);      
  
  //  console.log("Guardar elecciones");
  //  console.log(elecciones);
    elecciones.save((err, result) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
                
            });
        }
        res.json(result);
    });

};

exports.estadoEleccion = (req, res, next) => {
      let activa = true;
      Elecciones.findOne( {activa}, (err, elecciones) =>{
          if (err || !elecciones){
              return res.status(400).json({
                  error: "Elecciones no encontrada"
              });
          }
  
          return res.json(elecciones);
          next();
  
      }); 
         
  };