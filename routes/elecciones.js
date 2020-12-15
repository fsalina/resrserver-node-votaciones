const exprress = require("express");
const router = exprress.Router();

const{
    crearElecciones,  
    estadoEleccion
} = require("../controllers/elecciones");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


//Routes
router.post("/elecciones/create/:userId", requireSignin, isAuth, isAdmin, crearElecciones);
router.get("/elecciones/consultaEleccion", estadoEleccion);


// params
router.param("userId", userById);

module.exports = router;