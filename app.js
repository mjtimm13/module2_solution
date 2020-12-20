(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;

  tobuy.items = ShoppingListCheckOffService.getToBuyItems();
  console.log(tobuy.items);

  tobuy.statusMessage = "" ;

  if (tobuy.items === undefined || tobuy.items.length == 0) {
     console.log(tobuy.items.length);
     tobuy.statusMessage = "Everything is bought!";
      }
  else {
        tobuy.statusMessage = "";
      }

  console.log(tobuy.statusMessage);

  tobuy.itemName = "";
  tobuy.itemQuantity = "";

  tobuy.makeBoughtItem = function (itemIndex) {
    ShoppingListCheckOffService.makeBoughtItem(itemIndex);

    tobuy.itemStatus = ShoppingListCheckOffService.getToBuyStatus();
    console.log(tobuy.itemStatus);

  if (tobuy.items === undefined || tobuy.items.length == 0) {
     console.log(tobuy.items.length);
     tobuy.statusMessage = "Everything is bought!";
      }
  else {
        tobuy.statusMessage = "";
      }
  console.log(tobuy.statusMessage);
  }

}

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
  console.log(bought.items);

  bought.statusMessage = "Nothing bought yet.";

  if (bought.items === undefined || bought.items.length == 0) {
     console.log(bought.items.length);
     bought.statusMessage = "Nothing bought yet.";
      }
  else {
        bought.statusMessage = "";
      }
  console.log(bought.statusMessage);

  bought.makeToBuyItem = function (itemIndex) {
    ShoppingListCheckOffService.makeToBuyItem(itemIndex);

    if (bought.items === undefined || bought.items.length == 0) {
            console.log(bought.items.length);
       bought.statusMessage = "Nothing bought yet.";
     }
     else if (bought.items.length > 0){
       bought.statusMessage = "";
     }
   console.log(bought.statusMessage);
  };

   //console.log(bought.statusMessage);
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuyitems = [
  {
    name: "Tomatoes",
    quantity: 8
  },
  {
    name: "Fajita Wraps",
    quantity: 12
  },
  {
      name: "Frozen Okra",
      quantity: 4
  },
  {
      name: "Red Pepper Hummus",
      quantity: 1
  },
  {
      name: "Kale and Spinach Salad Mix",
      quantity: 2
  }
];

  var boughtitems = [];

  var tobuystatus = "";

  var boughtstatus = "Nothing bought yet.";

  //var boughtitems = [
  //{
  //  name: "Oranges",
  //  quantity: 6
  //}];

  service.makeToBuyItem = function (itemIndex) {
    tobuyitems.push(boughtitems[itemIndex]);
    boughtitems.splice(itemIndex, 1);
    if (boughtitems.length == 0){
      boughtstatus = "Nothing bought yet.";
    }
    else {
      boughtstatus = "";
    }
    console.log(boughtstatus);
  };

  service.makeBoughtItem = function (itemIndex) {
    boughtitems.push(tobuyitems[itemIndex]);
    tobuyitems.splice(itemIndex, 1);
    if (tobuyitems.length == 0){
      tobuystatus = "Everything is bought!";
    }
    else {
      tobuystatus = "";
    }
    console.log(tobuystatus);
  };

  service.getBoughtItems = function () {
    return boughtitems;
  };

  service.getToBuyItems = function () {
    return tobuyitems;
  };

  service.getBoughtStatus = function () {
    return boughtstatus;
  };

  service.getToBuyStatus = function () {
    return tobuystatus;
  };
}

})();
