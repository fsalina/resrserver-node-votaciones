const express = require("express");
const router = express.Router();

const{
    createSufragio,
    read
    ,countVotos
    ,countVotosCandidato        
} = require("../controllers/voto");

const{ SufraganteforValidation, ishabilitado, deshabilitar } = require("../controllers/sufragante");

/**
 * @swagger   
 * /api/signin: 
 *  post:
 *    summary: Sufragar
 *    description: Use to sufragar
 *    parameters:
 *      - in: path
 *        name: Run
 *        type: string
 *        required: true
 *        description: run sufragante
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              candidato:
 *                  type: string
 *                  description: nombre y apellido candidato
 *              blanco:
 *                  type: string
 *                  description: boto blanco
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.post("/voto/sufragar/:sufraganteRun", ishabilitado, createSufragio, deshabilitar);

/**
 * @swagger
 * /api//voto/countVotosAll:
 *  get:
 *    summary: cuenta votos x comuna
 *    description: entrega el numero total de votos
 *    responses:
 *      "200":
 *        description: A successful response
 */  
router.get("/voto/countVotosAll", countVotos);

router.get("/voto/countVotosCandidato", countVotosCandidato);


// params
router.param("sufraganteRun", SufraganteforValidation);
module.exports = router;