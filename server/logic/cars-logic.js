let carsDao = require("../dao/cars-dao")


async function getAllCars() { 
    let allCars = await carsDao.getAllCars();
    return allCars;
}

async function getAllCarsId() { 
   let allCarsId = await carsDao.getAllCarsId();
   return allCarsId;
}

async function getCarById(id) {
   let carDetails = await carsDao.getCarById(id)
//    let carPictures = await carsDao.getCarPicturesById(id)
//    carDetails["pictures"]=carPictures
//    console.log(carDetails)
  
   return carDetails;
}
// async function getCarPicturesById(id) {
//    let carPictures = await carsDao.getCarPicturesById(id)
//    let carPicArray = [];
//    for (let index = 0; index < carPictures.length; index++) {
//       carPicArray.push(carPictures[index].picture)
//    }
//    console.log(carPicArray)
//     return carPicArray
// }



module.exports = {
    getAllCars,
    getCarById,
    getAllCarsId
   //  getCarPicturesById
}