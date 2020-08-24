let ordersDao = require("../dao/orders-dao");
let usersDao = require("../dao/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function newOrder(orderDetails) { /* set new order */
    // console.log(orderDetails)
    // console.log("starting validation")
    // orderDetailsValidation(orderDetails)
    console.log("starting logic")
    let carPointsCostPerDay= await ordersDao.getCarPointsCostPerDay(orderDetails.carId); /* first getting car cost per day*/
    console.log("logic "+carPointsCostPerDay)
    console.log("resarvation "+orderDetails.reservationNumber)
    let rentalDaysAmount = getAmountOfDaysByDates(orderDetails.startDate,orderDetails.endDate)
   let totalPointsCost = carPointsCostPerDay*rentalDaysAmount;
   let priceUpdatedOrderDetails = {
      userId: orderDetails.userId,
      carId: orderDetails.carId,
      pointsCost: totalPointsCost,
      startDate: orderDetails.startDate,
      endDate: orderDetails.endDate,
      orderLocation: orderDetails.orderLocation,
      rentalDaysAmount: rentalDaysAmount,
      reservationNumber: orderDetails.reservationNumber
   }
   // this.checkDateAvailability()
   console.log(priceUpdatedOrderDetails)
   let currentPointsAmount = await usersDao.getCurrentPointsAmount(orderDetails.userId);
   console.log("final is "+currentPointsAmount)
   currentPointsAmount = currentPointsAmount - totalPointsCost;
   if (currentPointsAmount < 0 ) {
      throw new ServerError(ErrorType.USER_DONT_HAVE_ENOUGH_POINTS_LEFT)
   }
   console.log(currentPointsAmount)
   await ordersDao.setNewOrder(priceUpdatedOrderDetails); /* set order with the real price from DB */
   await usersDao.setUpdatedPointsAmount(orderDetails.userId, currentPointsAmount);

   return totalPointsCost;
}

function getAmountOfDaysByDates(startDate,endDate) {
   startDate = new Date(startDate.split('/')[2],startDate.split('/')[1]-1,startDate.split('/')[0]);
   endDate = new Date(endDate.split('/')[2],endDate.split('/')[1]-1,endDate.split('/')[0]);
   var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
   return diffDays;
}

async function getAllOrders(searchDates) {
   let allOrders = await ordersDao.getAllOrders()
   let unAvailbleDates = [];
   console.log("search start "+searchDates.startDate)
   console.log("search end "+searchDates.endDate)
   for (let index = 0; index < allOrders.length; index++) {
      if (unAvailbleDates.includes(allOrders[index].carId) == false) {
         if (allOrders[index].startDate == searchDates.startDate || allOrders[index].endDate == searchDates.endDate || allOrders[index].startDate == searchDates.endDate || allOrders[index].endDate == searchDates.startDate) {
            unAvailbleDates.push(allOrders[index].carId)
         }
         else if(checkIfDateIsBeetweenTheDates(allOrders[index].startDate, allOrders[index].endDate, searchDates.startDate)){
            unAvailbleDates.push(allOrders[index].carId)
         }
         else if(checkIfDateIsBeetweenTheDates(allOrders[index].startDate, allOrders[index].endDate, searchDates.endDate)){
            unAvailbleDates.push(allOrders[index].carId)
         }
         else if(checkIfDateIsBeetweenTheDates(searchDates.startDate, searchDates.endDate, allOrders[index].startDate)){
            unAvailbleDates.push(allOrders[index].carId)
         }
         else if(checkIfDateIsBeetweenTheDates(searchDates.startDate, searchDates.endDate, allOrders[index].endDate)){
            unAvailbleDates.push(allOrders[index].carId)
         }
      }
    }
   console.log("unavailble orders is "+unAvailbleDates)

   return unAvailbleDates;
}

function checkIfDateIsBeetweenTheDates(dateFrom,dateTo,dateCheck) {
   let d1 = dateFrom.split("/"); 
   let d2 = dateTo.split("/");
   let c = dateCheck.split("/");

   let from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
   let to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
   let check = new Date(c[2], parseInt(c[1])-1, c[0]);

   return(check > from && check < to)
}

async function getUserOrdersByUserId(userId) {
   let userOrders = await ordersDao.getUserOrdersByUserId(userId)
   console.log(JSON.stringify(userOrders));
   return userOrders;

}

// admin
async function getOrderByReservationNumber(reservationNumber) {
   let searchedOrder = await ordersDao.getOrderByReservationNumber(reservationNumber)
   return searchedOrder;
}


module.exports = {
   newOrder,
   getAllOrders,
   getUserOrdersByUserId,
   getOrderByReservationNumber
}