let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');
const { register } = require('../models/book');

/* helper function for gaurding purposes */
function requireAuth(req,res,next)
{
    //if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
router.get('/', bookController.displayBookList)
module.exports = router;

/* GET Route for displaying the Add page -  CREAT Operation */
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page -  CREAT Operation */
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for displaying the Edit page -  UPDATE Operation */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);


/* POST Route for processing the Edit page -  UPDATE Operation */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET Route to perform deletion -  DELETE Operation */
router.get('/delete/:id', requireAuth, bookController.performDelete)

