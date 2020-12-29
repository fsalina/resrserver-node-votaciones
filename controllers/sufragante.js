const Sufragante = require("../models/sufragante");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { sufraganteCreateValidator } = require("../validator");



exports.create = (req, res) => {

    console.log("guardar")
    try {
        const data = {  run: req.body.run, 
                        nombre: req.body.nombre,
                        circunscripcion: req.body.circunscripcion,
                        comuna: req.body.comuna,
                        provincia: req.body.provincia,
                        region: req.body.region,
                        pais: req.body.pais,
                        habilitado: req.body.habilitado
                         };      
        const sufragante = new Sufragante(data);
      //  console.log(sufragante);
        sufragante.save();

        res.sendStatus(201);
    } catch (error) {
        
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
    }   
    
};

exports.ishabilitado = (req, res, next) =>{

    if (! req.profile.habilitado ) { // el profile es el documento o Schema admin es 1
        return res.status(401).json({
            error: "sufragante no habilitado"
        });
    } 
    next();
};

//En caso de que el sufragante este habilitado lo deshabilito
exports.deshabilitar = (req, res, next ) => {
   // console.log("llega a deshabilitar");
    const sufragante = req.profile;
   // console.log(sufragante);
    sufragante.habilitado = "false";

   // console.log(sufragante.habilitado);
    sufragante.save((err, data) => {
        if (err) {
             return res.status(400).json({
                 error: errorHandler(err)
             });
        }
        res.json({
            mensaje: "Sufragio OK"
        });
    });
  // next();
  
};


// middlewares rest
exports.listAll = (req, res) => {
    //console.log("Lista todos sufragantes");
    Sufragante.find().exec((err, sufragante) => {
        if (err) {
            return res.status(404).json({
                error: "Sufragante does not exist"
            });
        }
        res.json(sufragante);    
    });
};



exports.SufraganteByRut = (req, res, next, run) => {
  // console.log(`Sufragante x Rut ${run}`);
    Sufragante.findOne( {run}, (err, sufragante) =>{
        if (err || !sufragante){
            return res.status(400).json({
                error: "Sufragante no encontrado"
            });
        }

        return res.json(sufragante);
       

    }); 
       
};

exports.sufraganteRun = (req, res, next) => {
    const sufragante = req.body;
    const run = sufragante.run;
   // console.log(sufragante._id);

    Sufragante.findOne( {run}, (err, sufragante) =>{
        if (err || !sufragante) {
            return res.status(400).json({
                error: "Sufragante not found"
            });
        }
        req.profile = sufragante;
        next();
    });
};

exports.SufraganteforValidation = (req, res, next, run) => {
    // console.log(`Sufragante x Rut ${run}`);
      Sufragante.findOne( {run}, (err, sufragante) =>{
          if (err || !sufragante){
              return res.status(400).json({
                  error: "Sufragante no encontrado"
              });
          }
  
         req.profile = sufragante;
         next();            
  
      });          
  };

exports.read = (req, res) => {    
  //  console.log("read sufragante");
    return res.json(req.sufragante);
};



exports.update = (req, res) => {
    const sufragante = req.sufragante;
    sufragante.name = req.body.name;
    sufragante.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    
    const sufragante = req.body;
    console.log(sufragante);
    const run = sufragante.run
    Sufragante.deleteOne( { run }, (err, sufragante) =>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "sufragante deleted"
        });
    });
};



