const {httpStatusCodes} = require("../helpers/httpStatusCode");
const {messageHandler} = require("../helpers/messageHandler");

class TodoValidation {
  static propertiesValidation(req, res, next){
    const checkReqBody = Object.keys(req.body);
   
    if(req.method === "POST" && checkReqBody.length !== 2){
      return next({status: httpStatusCodes._400_BAD_REQUEST.code, 
        message: messageHandler.validation.invalidPropertiesCreate});
    }

    if(req.method === "PUT" && checkReqBody.length !== 3){
      return next({status: httpStatusCodes._400_BAD_REQUEST.code, 
        message: messageHandler.validation.invalidPropertiesUpdate});
    }
    return next()
  }

  static apiNotFound(req, res, next){
    return next({status: httpStatusCodes._404_NOT_FOUND.code, 
      message: messageHandler.validation.apiNotFound});
  }
}

module.exports = TodoValidation