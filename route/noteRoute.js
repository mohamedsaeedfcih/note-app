const express =require('express');
const noteController = require('../controller/noteController')
const router =express.Router();

router.get('/notes',noteController.getallnotes)
router.post('/notes/save',noteController.savenotes)
router.put('/notes',noteController.updatenote)
router.delete('/notes/delete/:noteId',noteController.deletenotes)
module.exports = router