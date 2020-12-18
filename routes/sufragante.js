const express = require("express");
const router = express.Router();

const {
    listAll,
    SufraganteByRut,
    read,
    create,
    remove,
    deshabilitar
}= require("../controllers/sufragante");
const { sufraganteCreateValidator } = require("../validator");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


/**
 * @swagger
 * /api/sufragante/list:
 *  get:
 *    summary: list sufragante ByID
 *    description: Use to list sufragante
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/sufragante/listSufraganteRun/:sufraganteRun", read);

/**
 * @swagger
 * /api/sufragante/listAll:
 *  get:
 *    summary: list all sufragante
 *    description: Use to list all sufragantes
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/sufragante/listAll", listAll);

/**
 * @swagger
 * /api/sufragante/create:
 *  post:
 *    summary: create sufragante
 *    description: Use for create sufragantes
 *    responses:
 *      "200":
 *        description: A successful response
 */
//router.post("/sufragante", create);
router.post("/sufragante/create/:userId", requireSignin, isAuth, isAdmin, sufraganteCreateValidator, create);

/**
 * @swagger
 * /api/sufragante/delete:
 *  get:
 *    summary: delete sufragante
 *    description: Use for delete sufragantes
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.delete(
    "/sufragante/delete/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);

// params
router.param("userId", userById);
router.param("sufraganteRun", SufraganteByRut);

module.exports = router;