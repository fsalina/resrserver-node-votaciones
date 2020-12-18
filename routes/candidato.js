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
router.post("/candidato/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
    "/candidato/:candidatoId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/candidato/:candidatoId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.get("/candidatos", list);
//router.get("/candidatos/search", listSearch);
//router.get("/candidatos/partidos", listPartidos);
//router.post("/candidatos/by/search", listBySearch);
router.get("/candidato/photo/:candidatoId", photo);


// params
router.param("userId", userById);
router.param("candidatoId", candidatoById);

module.exports = router;