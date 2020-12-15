const Candidato = require("../models/candidato");
const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


// middlewares rest

exports.candidatoById = (req, res, next, id) => {
    Candidato.findById(id).exec((err, candidato) => {
        if (err ) {
            return res.status(404).json({
                error: "Candidato does not exist"
            });
        }
        req.candidato = candidato;
        next();
    });
};

// exports.create = (req, res) => {
//     console.log("Guardar candidato")
//     const candidato = new Candidato(req.body);
//     candidato.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json( { data });
//     });
// };

exports.create = (req, res) => {
   // console.log("grabar candidato");
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            cargo,
            region,
            ciudad,
            comuna,
            partido
        } = fields;

        if (
            !name ||
            !cargo ||
            !region ||
            !ciudad ||
            !comuna ||
            !partido
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let candidato = new Candidato(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            candidato.photo.data = fs.readFileSync(files.photo.path);
            candidato.photo.contentType = files.photo.type;
        }

        candidato.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};


exports.read = (req, res) => {
    return res.json(req.candidato);
};

exports.update = (req, res) => {
    const candidato = req.candidato;
    candidato.name = req.body.name;
    candidato.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const candidato = req.candidato;
    candidato.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Candidato deleted"
        });
    });
};

exports.list = (req, res) => {
    Candidato.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};