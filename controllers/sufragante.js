const Sufragante = require("../models/sufragante");
const { errorHandler } = require("../helpers/dbErrorHandler");


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
        console.log(sufragante);
        sufragante.save();

        res.sendStatus(201);
    } catch (error) {
        console.log("Error de no se que chucha")
        res.status(500).json({ msg: 'Se ha producido un error. Por favor, inténtelo más tarde.' });
    }

   /* const sufragante = new Sufragante(req.body);
 
    console.log(sufragante);
    console.log("llego aca");
  
    sufragante.save((err, sufragante) => {
        if (err) {
            console.log("error de no se que chucha");
            console.log(err);
           
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
       
        res.json({ 
                sufragante 
            });
    });
    */
    
    
};


// middlewares rest
exports.listAll = (req, res) => {
    console.log("Lista todos sufragantes")
    Sufragante.find().exec((err, data) => {
        if (err) {
            return res.status(404).json({
                error: "Sufragante does not exist"
            });
        }
        req.Sufragante = sufragante;        
    });
};

exports.listSufragante = (req, res, id, data) =>{
    Sufragante.find(id).exec((err, data) =>{
        if(err){
            return res.status(404).json({
                error: "does not data"
            });
        }
        req.Sufragante = sufragante;
    });
    next();
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
    const sufragante = req.sufragante;
    sufragante.remove((err, data) => {
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



