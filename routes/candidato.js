const express = require("express");
const router = express.Router();

const{
    create,
    candidatoById,
    read,
    remove,
    update,
    list,
   // listPartidos,
    photo
} = require("../controllers/candidato");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


// routes
router.get("/candidato/:candidatoId", read);

/**
 * @swagger   
 * /api/candidato/create: 
 *  post:
 *    summary: Crear Candidato
 *    description: Use for create candidato
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: userId for candidato
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                  type: string
 *                  description: nombre y apellido candidato
 *              cargo:
 *                  type: string
 *                  description: boto blanco
 *              region:
 *                  type: string
 *                  description: Region del candidato
 *              ciudad: 
 *                  type: string
 *                  description: ciudad
 *              comuna:
 *                  type: string
 *                  description: comuna
 *              partido:
 *                  type: objectID
 *                  description: objectId del partido al que pertenece el candidato
 *              photo:
 *                  data: Buffer,
 *                  contentType: String
 *                  description: Data Buffer contentType String Photo candidato
 *                  
 *          
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.post("/candidato/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/candidato/:candidatoId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/candidato/:candidatoId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/candidatos", list);

router.get("/candidato/photo/:candidatoId", photo);


// params
router.param("userId", userById);
router.param("candidatoId", candidatoById);

module.exports = router;