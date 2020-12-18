const Voto = require("../models/voto");
const { errorHandler } = require("../helpers/dbErrorHandler");
//const voto = require("../models/voto");
//const sufragante = require("../models/sufragante");

exports.createSufragio = (req, res, next) =>{
   console.log("entra a guardar sufragio");
    const voto = new Voto(req.body);
   // console.log(voto);

    voto.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
       // res.json( { data });
    });
  next();
};


exports.read = (req, res, next) => {    
    //  console.log("read voto");
      return res.json(req.voto);
      next();
};

exports.countVotos = (req, res) =>{
    Voto.countDocuments({}, (err,voto) =>{
        if(err){
            return res.status(404).json({
                error: "No se pudo contar los votos"
            });
        }
        res.json(voto);
    });

};

exports.countVotosCandidato = (req, res) =>{
    
  /*  let voto = new Voto(req.body);
    //console.log(voto);
    Voto.countDocuments({candidato: voto.candidato}, (err,voto) =>{
        if(err){
            return res.status(404).json({
                error: "No se pudo contar los votos del candidato"
            });
        }

        //crear un objeto con el conteo de  votos
        res.json(voto);
    });
    */

    Voto.aggregate(
        [
            {$group:
                {
                    _id: "$nomCandidato",
                    total_votos:{$sum:1}
                }
            }
          
        ], (err, voto) =>{
            if(err){
                return res.status(404).json({
                    error:"error al contar votos"
                });
            }
            res.json(voto);
        }
    );
};


/*Name 	Description
$eq 	Matches values that are equal to a specified value.
$gt 	Matches values that are greater than a specified value.
$gte 	Matches values that are greater than or equal to a specified value.
$in 	Matches any of the values specified in an array.
$lt 	Matches values that are less than a specified value.
$lte 	Matches values that are less than or equal to a specified value.
$ne 	Matches all values that are not equal to a specified value.
$nin 	Matches none of the values specified in an array.*/