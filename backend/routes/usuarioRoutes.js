const router = require('express').Router()

const UsuarioController = require('../controllers/UsuarioController')

// router.get("/login", UsuarioController.loginUsuario)
router.post('/loginPost', UsuarioController.loginPost)
// router.get("/registrarUsuario", usuarioController.registrarUsuario)
router.post('/registrarUsuarioPost', UsuarioController.registrarUsuarioPost)
// router.get("/:id", usuarioController.buscarUsuario)
// router.delete("/:id", usuarioController.deletarUsuario)
// router.put("/atualizarUsuarioPost", usuarioController.atualizarUsuario)
router.get('/buscar-usuario', UsuarioController.buscarUsuarioByEmail)
module.exports = router