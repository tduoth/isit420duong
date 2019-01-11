var generateOrders = function(){

    var newSeconds;
    var d = new Date(); // for now
    var hours = d.getHours(); // => 9
    var minutes = d.getMinutes();
    var currentSeconds = d.getSeconds();

    function createOrder(){

    var orders = null;
    var stores = [98053, 98007, 98077, 98055, 98011, 98046];
    var itemNumbers = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];


        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        newSeconds = currentSeconds + randomInt(2, 120);

        if (newSeconds >= 59){
            newSeconds = newSeconds - 59;
            minutes = minutes + 1;
            if (newSeconds >= 59){
                newSeconds = newSeconds - 59;
                minutes = minutes + 1
            }
        }
        if (minutes >=59){
            minutes = 0;
            hours = hours + 1;
        }
        if (hours >= 12){
            hours = 1;
        }

        orders = {
            storeNumber: stores[randomInt(0, 5)],
            salesPersonID: randomInt(1, 24),
            itemNumber: itemNumbers[randomInt(0, 9)],
            timePurch: hours + ':' + minutes + ':' + newSeconds,
            pricePaid: randomInt(5, 15)

        };
        return orders;
    }
        var oneOrder = createOrder();
        console.log('store number: ' + oneOrder.storeNumber);
        $('#textBoxStore').val(oneOrder.storeNumber);
        $('#textBoxPerson').val(oneOrder.salesPersonID);
        $('#textBoxItem').val(oneOrder.itemNumber);
        $('#textBoxTime').val(oneOrder.timePurch);
        $('#textBoxPrice').val(oneOrder.pricePaid);

 $('#submitOneOrder').click(function() {
                $.post("/addorder", oneOrder, function (result) {
                    checkResult(result);
                })
            }
        );
$('#submitOrders').click(function() {
            for (var i = 0; i < 450; i++) {
                var order = createOrder();
                $.post("/addorder", order, function (result) {
                    checkResult(result);

                })
            }
        }
    );

        function checkResult(result) {
            $("#status").html(result.result);
        }
    };

$(document).ready(function() { 'use strict';

generateOrders();
});


