let express = require("express");
let router = express.Router();

const config = require('../config.json');
const jwt = require('jsonwebtoken');

let usersLogic = require("../logic/users-logic")

const usersCache = new Map();

router.get("/auth/:authorizationString" , async (request,response) => {
  let authorizationString = request.params.authorizationString
  console.log("auth " + authorizationString);
  try {
    await usersLogic.getUserDetailsByToken(authorizationString); /* get user details for using his ID */
    response.json(true)
    
        
  } catch (error) {
    console.log(error)
    response.json(false)
  }
    
})

router.post("/login" , async (request,response,next) => {
    let user = request.body;
    try {
      let connectedUserDetails = await usersLogic.login(user);
      const userToken = jwt.sign({ sub: connectedUserDetails.name }, config.secret);
      await usersLogic.setLoggedInUserInCache(userToken , connectedUserDetails);
      let responseToUser = {
        id:connectedUserDetails.id,
        name:connectedUserDetails.userName,
        userType: connectedUserDetails.userType,
        token: userToken
      }
      response.json(responseToUser)
    } catch (error) {
      console.log(error)
      return next(error);
    }
})

router.get("/memberships/:name" , async (request,response,next) => {
  let name = request.params.name
    console.log(name)
    try {
        let membershipDetails = await usersLogic.getMembershipByname(name)
        response.json(membershipDetails);
    } catch (error) {
      console.log(error)
        console.log("somthing went wrong at getting membership details");
        return next(error)
    }
    
})
router.get("/memberships" , async (request,response,next) => {
    try {
        let memberships = await usersLogic.getMemberships()
        response.json(memberships);
    } catch (error) {
      console.log(error)
      console.log("somthing went wrong at getting memberships");
      return next(error)
    }
})

router.post("/message" , async (request,response,next) => { /* set new order */
    let messageDetails = request.body;
    console.log(messageDetails)
   
      try {
  
      await usersLogic.setNewMessage(messageDetails); /* set order to DB */
      
      response.json("Added new message")
      
    } catch (error) {
      console.log(error)
      return next(error)
    }
})

router.get("/profile" , async (request,response,next) => {
  let authorizationString = request.headers["authorization"]; /* take user token */
  console.log(authorizationString)
  try {
    let userDetails = await usersLogic.getUserDetailsByToken(authorizationString); /* get user details for using his ID */
    let userId = userDetails.id; /* take user ID */
    let userProfile = await usersLogic.getUserProfile(userId);
    console.log(userProfile)
    response.json(userProfile);
  } catch (error) {
    console.log(error)
    return next(error)
    // response.json("somthing went wrong at getting orders by user, probebly no auth");
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