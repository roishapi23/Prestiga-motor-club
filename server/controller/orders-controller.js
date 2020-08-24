let express = require("express");
let router = express.Router();

let ordersLogic = require("../logic/orders-logic")
let usersLogic = require("../logic/users-logic")


router.post("/" , async (request,response,next) => { /* set new order */
    let orderDetails = request.body;
    console.log(orderDetails)
    let authorizationString = request.headers["authorization"]; /* take user token */
    try {
      let userDetails = await usersLogic.getUserDetailsByToken(authorizationString); /* get user details for using his ID */
      let userId = userDetails.id; /* take user ID */
      orderDetails["userId"] = userId; /* add customerId to orderDetails */
      let reservationNumber = Math.floor(Math.random() * 10000000000) /* mock resarvation number */
      orderDetails["reservationNumber"] = reservationNumber;
      let paidPrice = await ordersLogic.newOrder(orderDetails); /* set order to DB */
        // answer to client
      response.json({paidPrice:paidPrice, resarvationNumber: reservationNumber})
    } catch (error) {
      console.log(error)
      console.log("error setting new order");
      return next(error)
    }
})

router.post("/searchByDates" , async (request,response,next) => {
  let searchedDates = request.body
  try {
    let unavailableCarIds = await ordersLogic.getAllOrders(searchedDates);
    console.log(unavailableCarIds)
        response.json(unavailableCarIds);
    } catch (error) {
      console.log(error)
      console.log("somthing went wrong at getting all orders");
      return next(error)
    }
    
})
router.get("/byUser" , async (request,response,next) => {
    let authorizationString = request.headers["authorization"]; /* take user token */
    try {
      let userDetails = await usersLogic.getUserDetailsByToken(authorizationString); /* get user details for using his ID */
      let userId = userDetails.id; /* take user ID */
      let userOrders = await ordersLogic.getUserOrdersByUserId(userId);
      response.json(userOrders);
    } catch (error) {
      console.log(error)
      return next(error)
    }   
})

router.get("/:reservationNumber" , async (request,response,next) => {
  let reservationNumber = +request.params.reservationNumber;
    try {
      let searchedOrder = await ordersLogic.getOrderByReservationNumber(reservationNumber);
      response.json(searchedOrder);
    } catch (error) {
      console.log(error)
      console.log("somthing went wrong at getting orders by reservationNumber");
      return next(error)
    }   
})

// router.delete("/:reservationNumber" , async (request,response) => {
//   let reservationNumber = +request.params.reservationNumber;
//     try {
//       await ordersLogic.getOrderByReservationNumber(reservationNumber);
//       response.json("order has been deleted");
//     } catch (error) {
//       console.log(error)
//       response.json("somthing went wrong at deleting order");
//     }   
// })


module.exports = router;