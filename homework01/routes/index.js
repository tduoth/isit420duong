var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    'use strict';
    res.render('index', {title: 'Thanh & Sean'});
});

router.post('/insertOrder', function(req, res) {
    'use strict';

    var order = {
        storeNumber: req.body.storeNumber,
        salesPersonId: req.body.salesPersonId,
        itemNumber: req.body.itemNumber,
        pricePaid: req.body.pricePaid,
        timePunch: req.body.timePunch
    };

    var orders = req.db.get('orders2');
    orders.insert(order, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send({
                result: 'failed'
            });
        }
        else {
            res.send({
                result: 'success'
            });
        }
    });
});

router.get('/insertOrder', function (req, res, next) {
    'use strict';

    var order = {
        storeNumber: req.query.storeNumber,
        salesPersonId: req.query.salesPersonId,
        itemNumber: req.query.itemNumber,
        pricePaid: req.query.pricePaid,
        timePunch: req.query.timePunch
    };

    var orders = req.db.get('orders');
    orders.insert(order, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send({
                result: 'failed'
            });
        }
        else {
            res.send({
                result: 'success'
            });
        }
    });

});
module.exports = router;
