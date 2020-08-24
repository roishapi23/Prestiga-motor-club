
let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "We are sorry, it seems we have general error", isShowStackTrace: true},
    USER_DONT_HAVE_ENOUGH_POINTS_LEFT : {id: 2, httpCode: 601, message : "User can't make order, not enough points", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    PASSWORD_DONT_MATCH : {id: 4, httpCode: 602, message : "Regastration failed, password are not the same", isShowStackTrace: false},
    DETAILS_NOT_VALID : {id: 5, httpCode: 603, message : "Some of the information is not valid", isShowStackTrace: false},
    DELIVERY_DATE_FULLY_BOOKED : {id: 6, httpCode: 604, message : "Chosen delivery date is unavailble", isShowStackTrace: false},
    ID_NUMBER_ALREADY_EXIST : {id: 7, httpCode: 605, message : "ID number already exists", isShowStackTrace: false},
    EMAIL_ADDRESS_ALREADY_EXIST : {id: 8, httpCode: 606, message : "Email address already exists", isShowStackTrace: false},
    TOKEN_UNVALID : {id: 9, httpCode: 607, message : "Token is expired", isShowStackTrace: false},
    NO_ADMIN_AUTORIZATION : {id: 10, httpCode: 608, message : "Regular customer tried to enter admin area", isShowStackTrace: true}
    
    
}

module.exports = ErrorType;