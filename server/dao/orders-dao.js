let connection = require("./connection");

let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type"); 

async function setNewOrder(orderDetails) { /* set new order */
    let sql = "INSERT INTO orders (carId, userId, startDate, endDate, pointsCost, orderLocation, rentalDaysAmount, reservationNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let parameters = [orderDetails.carId, orderDetails.userId, orderDetails.startDate,orderDetails.endDate, orderDetails.pointsCost, orderDetails.orderLocation, orderDetails.rentalDaysAmount,orderDetails.reservationNumber]
    await connection.executeWithParameters(sql,parameters);
}

async function getCarPointsCostPerDay(carId) {
    let sql = "select pointsPerDay from cars where id=?";
    let parameters = carId;
    try {
        let carsPointsCostPerDay = await connection.executeWithParameters(sql,parameters);
        console.log("dao"+ JSON.stringify(carsPointsCostPerDay));
        
        return carsPointsCostPerDay[0].pointsPerDay;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getCarPointsCostPerDay(carId) {
    let sql = "select pointsPerDay from cars where id=?";
    let parameters = carId;
    try {
        let carsPointsCostPerDay = await connection.executeWithParameters(sql,parameters);
        console.log("dao"+ JSON.stringify(carsPointsCostPerDay));
        
        return carsPointsCostPerDay[0].pointsPerDay;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getUserOrdersByUserId(userId) {
    let sql = "SELECT O.id, O.startDate, O.endDate, O.pointsCost, O.pointsCost, O.rentalDaysAmount, O.reservationNumber ,C.model, C.company, C.pictures FROM orders O INNER JOIN cars C on C.id=O.carId INNER JOIN users U on U.Id=O.userId WHERE O.userId=?"
    let parameters = userId;
    try {
        let userOrders = await connection.executeWithParameters(sql,parameters);
        // console.log("dao"+ JSON.stringify(carsPointsCostPerDay));
        
        return userOrders;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getAllOrders() {
    let sql = "select * from orders";
    // let sql = "SELECT C.id, C.licensePlate, O.startDate, O.endDate, O.rentalDaysAmount FROM cars C INNER JOIN orders O on C.id=o.carId";
    try {
        let allOrders = await connection.execute(sql);
        return allOrders;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// admin
async function getOrderByReservationNumber(reservationNumber) {
    let sql = "select * from orders where reservationNumber=?";
    let parameters = reservationNumber;
    try {
        let searchedOrder = await connection.executeWithParameters(sql,parameters);    
        return searchedOrder;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

module.exports = {
    setNewOrder,
    getCarPointsCostPerDay,
    getAllOrders,
    getUserOrdersByUserId,
    getOrderByReservationNumber
}

