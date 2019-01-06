var Orders = (function () {
    'use strict';
    var data = null;
    var order = null;

    // constructor
    function Orders() {
        $('#ordersButton').click(generateOrders);
        $('#generateOrder').click(generateOrderHandler);
        $('#saveOrder').click(saveOrderToDb);
    }

    Orders.prototype.importData = function () {
        $.getJSON('data.json', function (result) {
            data = result;
        });
    };

    function generateOrders(){

        var numberOfOrders =  $('#numberOfOrders').val();
     if(numberOfOrders&&!isNaN(numberOfOrders)){
            for (var i = 0; i < numberOfOrders; i++) {
                generateOrder();
                if(order){
                    saveOrderToDb();
                }
            }
        }
        else{
            alert('Order Success Submit to Database');
        }
    }

    function generateOrderHandler() {
        generateOrder();
        displayOrder();
    }

    function generateOrder() {

        var storeNumber = null;
        var salesPersonId = null;
        var itemNumber = null;
        var pricePaid = null;
        var timePunch = null;

        //var order = null;

        if (data.hasOwnProperty('storeInfo') && data.hasOwnProperty('itemNumbers') &&
            data.hasOwnProperty('itemMaxPrice') && data.hasOwnProperty('itemMinPrice')) {

            var storeInfo = generateNumber(data['storeInfo']);
            if (storeInfo.hasOwnProperty('zipCode')) {
                storeNumber = storeInfo['zipCode'];
                salesPersonId = generateNumber(storeInfo['salesPersonsIds']);
            }
            itemNumber = generateNumber(data['itemNumbers']);
            pricePaid = Math.floor(Math.random() * ((data['itemMaxPrice'] - data['itemMinPrice']) + 1)) + data['itemMinPrice'];
            timePunch = generateRandomTime();

            order = {
                storeNumber: storeNumber,
                salesPersonId: salesPersonId,
                itemNumber: itemNumber,
                pricePaid: pricePaid,
                timePunch: timePunch
            };
        }
        return order;
    }

    function saveOrderToDb() {
        $.post('/insertOrder', order, function (result) {
            console.log(order);
            showOrderStatus(result);
        }, 'json').done(function() {
            console.log('Done saving to database');
        }).fail(function(jqxhr, textStatus, error) {
            console.log('error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
        });
    }

    function displayOrder() {

        if (order) {
            for (var property in order) {
                if (order.hasOwnProperty(property)) {
                    var controlId = '#' + property;
                    $(controlId).val(order[property]);
                }
            }
        }
    }

    function generateNumber(array) {
        var random = Math.floor(Math.random() * array.length);
        return array[random];
    }

    function generateRandomTime() {
        var minSeconds = 2;
        var maxSeconds = 120;
        var randomSeconds = Math.floor(Math.random() * ((maxSeconds - minSeconds) + 1)) + minSeconds;

        var currentdate = new Date();
        currentdate.setSeconds(currentdate.getSeconds() + randomSeconds);

        var timePunch = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        return timePunch;
    }

    function showOrderStatus(result) {

        if (result.result == 'success') {
            $('#ordersPlacementStatus').html('Order(s) saved successfully');
        }
        else {
            $('#ordersPlacementStatus').html('Order(s) failed to save to the database');
        }
    };

    return Orders;
}());

$(document).ready(function () {
    'use strict';
    var myOrders = new Orders();
    myOrders.importData();
});

