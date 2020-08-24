let usersDao = require("../dao/users-dao")
const crypto = require("crypto");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");    


const usersCache = new Map();

async function login(user) {
    // console.log("starting validation")
    // loginValidation(user)
    // console.log("ending validation")
    // let hashedPassword = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    //    console.log(hashedPassword)
    // user.password = hashedPassword;
    let usersLoginResult = await usersDao.login(user);
    if (usersLoginResult.length == 0) {

        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return usersLoginResult[0];
}

async function setLoggedInUserInCache(userToken,userDetails) {
    // let token = userToken.substring("Bearer ".length);
    console.log("first token "+userToken)
    usersCache.set(userToken, userDetails);
    let user = usersCache.get(userToken);
    console.log("user in cache is "+JSON.stringify(user))
    
}

async function getUserDetailsByToken(authorizationString) {
    let myToken = authorizationString.substring("Bearer ".length);
    console.log("my token"+myToken)
    let userDetails = usersCache.get(myToken);
    console.log("userDetails at get token by user = "+userDetails)
    if (userDetails == undefined) {
        throw new ServerError(ErrorType.TOKEN_UNVALID);
    }
    console.log("userDetails form map is "+JSON.stringify(userDetails))
    return userDetails;
}

async function getMembershipByname(name) {
    console.log(name)
    let membershipDetails = await usersDao.getMembershipByName(name)
    return membershipDetails;
}
async function getMemberships() {

    let memberships = await usersDao.getMemberships()
    
    return memberships;
}

async function getUserProfile(userId) {

    let userProfileDetails = await usersDao.getUserProfile(userId)
    
    return userProfileDetails;
}

async function setNewMessage(messageDetails) {
    await usersDao.setNewMessage(messageDetails);
}


module.exports = {
    login,
    setLoggedInUserInCache,
    getUserDetailsByToken,
    getMembershipByname,
    setNewMessage,
    getMemberships,
    getUserProfile
}