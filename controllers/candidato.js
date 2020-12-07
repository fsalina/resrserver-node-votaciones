const Candidato = require("../models/candidato");
const { errorHandler } = require("../helpers/dbErrorHandler");
const candidato = require("../models/candidato");


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

exports.create = (req, res) => {
    const candidato = new Candidato(req.body);
    candidato.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
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