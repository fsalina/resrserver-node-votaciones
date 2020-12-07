const exprress = require("express");
const router = exprress.Router();

const{
    crearElecciones
} = require("../controllers/elecciones");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//Routes
router.post("/eleeciones/create/:userId", requireSignin, isAuth, isAdmin, crearElecciones);


//params

router.param("userId", userById);

module.exports = router;