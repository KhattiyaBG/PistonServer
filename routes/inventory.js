const express = require('express');
const multer = require('multer');

const router = express.Router();
const inventoryContollers = require('../controllers/inventory');
const passport = require('passport');

const authentication = passport.authenticate("่jwt", {session : false});

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, 'image');
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimeType && extname){
            return cb(null, true);
        }
        cb('Give proper files formate to upload');
    },
}).single('image');

router.get('/getinventory',authentication,  inventoryContollers.getInventory);
router.post('/postinventory', authentication, upload, inventoryContollers.addInventory);
router.put('/updateinventory', authentication, upload, inventoryContollers.updateInventory);
router.delete('/deleteinventory/:id', authentication, inventoryContollers.deleteInventory);

module.exports = router;