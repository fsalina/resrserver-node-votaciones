
const Partido = require("../models/partido");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
   
    const partido = new Partido(req.body);
    partido.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};


exports.list = (req, res) => {
    Partido.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};