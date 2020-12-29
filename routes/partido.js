const express = require("express");
const router = express.Router();

const {
    create,
    list
} = require("../controllers/partido");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/partido/create/:userId", requireSignin, isAuth, isAdmin, create);

/**
 * @swagger
 * /api/sufragante/list:
 *  get:
 *    summary: list All partidos
 *    description: list All partidos
 *    responses:
 *      "200":
 *        description: A successful response
 */
router.get("/partido/list", list);

// params

router.param("userId", userById);

module.exports = router;