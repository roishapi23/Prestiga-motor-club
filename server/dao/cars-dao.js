let connection = require("./connection");

let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type"); 

// async function getAllServers() { 
//     // let sql = "select * from servers";
//     let sql = "SELECT S.id, S.serverName, S.serverIP, S.serverStatus, H.name AS hostName FROM servers S INNER JOIN hosting_companys H on S.hostingCompany=H.id";
//     let allServers = await connection.execute(sql);
//     // console.log(allServers)
//     return allServers
// }

async function getAllCars() {
    let sql = "select * from cars";
    try {
        let allCars = await connection.execute(sql);
        return allCars;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getAllCarsId() {
    let sql = "select id from cars";
    try {
        let allCarsId = await connection.execute(sql);
        return allCarsId;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

async function getCarsByLocation(location) {
    let sql = "select * from cars where location=?";
    let parameters = location;
    try {
        let carsByLocation = await connection.executeWithParameters(sql,parameters);
        return carsByLocation;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}
async function getCarById(id) {
    let sql = "select * from cars where id=?";
    let parameters = id;
    try {
        let carDetails = await connection.executeWithParameters(sql,parameters);
        return carDetails[0];
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

// async function getCarPicturesById(id) {
//     let sql = "select picture from pictures where car_id=?";
//     let parameters = id;
//     try {
//         let carPictures = await connection.executeWithParameters(sql,parameters);
//         return carPictures;
//     }
//     catch (e) {
//         throw new Error();
//     }
// }





module.exports = {
    getAllCars,
    getCarById,
    getAllCarsId
    // getCarPicturesById
}

