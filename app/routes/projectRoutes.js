const express = require('express');
const { createProject, getProjectByIdController, getProjectByUserIdController, createUrl, getUrl} = require('../controllers/projectController');
const router = express.Router();


router.post('/create-project', createProject );
router.get('/get-project', getProjectByIdController);
router.get('/get-project-by-user', getProjectByUserIdController);
router.post('/create-url', createUrl);
router.get('/get-url', getUrl);




module.exports = router;
