let express = require("express");
let router = express.Router();

let carsLogic = require("../logic/cars-logic")
let usersLogic = require("../logic/users-logic")


router.get("/" , async (request,response,next) => {
    try {
        let allCars = await carsLogic.getAllCars();
        response.json(allCars);
    } catch (error) {
        console.log(error)
        console.log("somthing went wrong at getting all cars");
        return next(error)
    }
    
})

router.get("/rental" , async (request,response, next) => {
    let authorizationString = request.headers["authorization"];
    try {
        /* checking if the user has a valid token */
        let userDetails = await usersLogic.getUserDetailsByToken(authorizationString);
        let allCars = await carsLogic.getAllCars();
        response.json(allCars);
    } catch (error) {
        console.log(error)
        console.log("somthing went wrong at getting all cars");
        return next(error)
    }
    
})



router.get("/:id" , async (request,response,next) => {
    let id = +request.params.id
    console.log(id)
    try {
        let carDetails = await carsLogic.getCarById(id)
        // let carPictures = await carsLogic.getCarPicturesById(id)
        // // console.log(carDetails);
        // carDetails["pictures"] = carPictures;
        // console.log(carDetails);

        response.json(carDetails);
        // response.json({details:carDetails,pictures:carPictures});
        
    } catch (error) {
        console.log(error)
        console.log("somthing went wrong at getting all cars");
        return next(error)
    }
    
})

// router.put("/:id" , async (request,response) => {
//     let serverId = +request.params.id;
//     console.log(serverId)
//     let clientObject = request.body;
//     let newStatus = clientObject.status;
//     console.log(newStatus)
//     let serverDetails = {id:serverId,status:newStatus}
//     try {
//         await serversLogic.setServerStatus(serverDetails)
//         response.json("server starus has been succesfully changed");
//     } catch (error) {
//         console.log(error)
//         response.status(600).json("somthing went wrong at updating status ");
//     }
    
// })


module.exports = router;