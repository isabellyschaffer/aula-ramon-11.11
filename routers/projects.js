const express = require("express");
const router = express.Router();
const controlProjects = require("../controllers/projectsControl");
const { cookieValidator } = require("../middlewares/cookieValidator");

router.get("/", cookieValidator, controlProjects.listProjects);
router.get("/:id", cookieValidator, controlProjects.getProject);
router.post("/", cookieValidator, controlProjects.createProject);
router.post("/:id", cookieValidator, controlProjects.updateProject);
router.delete("/:id", cookieValidator, controlProjects.deleteProject);

app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);


module.exports = router;
