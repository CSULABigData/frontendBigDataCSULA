var express = require('express');
var router = express.Router();

/*this is where we query the database 
 * GET userlist.
 */
router.get('/userlist', function(req, res) { // find data
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});
/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) { // add a user to the database
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {//delete from database
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
