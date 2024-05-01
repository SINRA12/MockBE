var myMap = new Map();

// FIXME:Add logic to print request count when loggging response on console
var reqCounter = 0;

module.exports ={
        //success function will send all success response	
        sendResponse: function (req, contentType, res, endPoint, responseSuccessData, responseTime, startTime,statusCode) {
                setTimeout(function () {        
                console.log(/*Date.now() + “, ” + “s*/" Success" + ", " + endPoint + ", " + (new Date().getTime() - startTime) + ", " + req.method);
                        //Setting up response content type to json if content type is not provided
                        if (contentType != null) {
                                res.set('Content-Type', contentType);
                        } else {
                                res.set('Content-Type', 'application/json; charset=utf-8');
                        }
                        if(statusCode==null){
                                res.status('400');
                                console.log("No mocked data found");
                                res.send("No mocked data found");
                        }else{
                                res.status(statusCode);
                                console.log(responseSuccessData);
                                res.send(responseSuccessData);
                        }
                       
                }, responseTime);
                
        }
}
