let connection = require("./connection");

let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type"); 


async function login(user) {
    let sql = "select * from users where email=? and password=?";
    let parameters = [user.email, user.password]
    try {
        let usersLoginResult = await connection.executeWithParameters(sql,parameters);
        return usersLoginResult;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getMembershipByName(name) {
    console.log(name)
    let sql = "select * from memberships where type=?";
    let parameters = name;
    console.log(name)
    try {
        let membershipDetails = await connection.executeWithParameters(sql,parameters);
        console.log(membershipDetails)
        return membershipDetails[0];
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}
async function getMemberships() {

    let sql = "select * from memberships";
    try {
        let memberships = await connection.execute(sql);
        console.log(memberships)
        return memberships;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getCurrentPointsAmount(userId) {
    console.log(userId)
    let sql = "select currentPointsAmount from users where id=?";
    let parameters = userId;
    try {
        let currentUserPoints = await connection.executeWithParameters(sql,parameters);
        console.log(currentUserPoints)
        return currentUserPoints[0].currentPointsAmount;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function setUpdatedPointsAmount(userId,newCurrentPointsAmount) { /* set new order */
    let sql = "UPDATE users SET currentPointsAmount=? WHERE id=?" 
    let parameters = [newCurrentPointsAmount, userId];
    await connection.executeWithParameters(sql,parameters);
}

async function setNewMessage(messageDetails) { /* set new order */
    console.log(messageDetails)
    let sql = "INSERT INTO messages (name, email, phoneNumber, message) VALUES (?, ?, ?, ?)";
    let parameters = [messageDetails.name, messageDetails.email, messageDetails.phone ,messageDetails.message]
    await connection.executeWithParameters(sql,parameters);
}

async function getUserProfile(userId) {
    let sql = "SELECT U.id, U.userName, U.familyName, U.currentPointsAmount, U.phoneNumber, U.drivingLicense, U.idNumber, U.city, U.street, M.type, M.pointsPerYear, M.pic, SUM(O.pointsCost) AS totalUsedPoints, COUNT(O.id) AS amoutOfOrders FROM orders O INNER JOIN cars C on C.id=O.carId INNER JOIN users U on U.Id=O.userId INNER JOIN memberships M on M.id=U.membershipType WHERE O.userId=?"
    let parameters = userId;
    try {
        let userProfileDetails = await connection.executeWithParameters(sql,parameters);
        // console.log("dao"+ JSON.stringify(carsPointsCostPerDay));
        
        return userProfileDetails[0];
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}



module.exports = {
    login,
    getMembershipByName,
    getCurrentPointsAmount,
    setUpdatedPointsAmount,
    setNewMessage,
    getMemberships,
    getUserProfile
}

