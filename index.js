const dynamicResponse = require("./dynamicResponse");

var appendPointDataSetConfig = function appendPointDataSetConfig(req, res, start_time) {
    //This function reads the configuration and sets all variable values at the end it calls sendResponse function.
    // Also it calls updateResponse function if dynamic response is required
    //var endPoint = originalUrl
    originalUrl=req.originalUrl;
    var  index,contentType;
    responseObject={}

    for (let i = 0; i < requestCount; i++) {
      //loggingEnable = apiData[i].loggingEnable;
      var regex = new RegExp(mocks[i].endPoint);
      console.log("headers length " +mocks[i].headers.length)
      console.log("qparams length " +mocks[i].qparams.length)
      console.log("requestbodies length " +mocks[i].requestBody.length)
      console.log("responseheaders length " +mocks[i].responseHeaders.length)
      if (originalUrl.match(regex) && mocks[i].httpMethod==req.method) {
        headersLength = mocks[i].headers.length;
        queryParamLength = mocks[i].qparams.length;
        requestBodyLength =mocks[i].requestBody.length
        responseHeadersLength=mocks[i].responseHeaders.length
        contentType=mocks[i].contentType
        if(headersLength>0 && queryParamLength>0 && requestBodyLength>0){
            headerMatched= matcherUtil.headersMatched(req,headersLength,mocks[i])
            qParamMatched= matcherUtil.qParamMatched(req,queryParamLength,mocks[i])
            reqBodyMatched= matcherUtil.reqBodyMatched(req,requestBodyLength,mocks[i])
            if(headerMatched && qParamMatched && reqBodyMatched ){
                responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req,res,mocks[i],responseHeadersLength,i)
                break;
              }
        }else if(headersLength>0 && queryParamLength>0){
            headerMatched= matcherUtil.headersMatched(req,headersLength,mocks[i])
            qParamMatched= matcherUtil.qParamMatched(req,queryParamLength,mocks[i])
            if(headerMatched && qParamMatched){
                responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req,res,mocks[i],responseHeadersLength,i)
                break;
              }
        }else if(headersLength>0 && requestBodyLength>0){
            headerMatched= matcherUtil.headersMatched(req,headersLength,mocks[i])
            reqBodyMatched= matcherUtil.reqBodyMatched(req,requestBodyLength,mocks[i])
            if(headerMatched && reqBodyMatched){
                responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req,res,mocks[i],responseHeadersLength,i)
                break;
              }
        }else if(queryParamLength>0 && requestBodyLength>0){
            qParamMatched= matcherUtil.qParamMatched(req,queryParamLength,mocks[i])
            reqBodyMatched= matcherUtil.reqBodyMatched(req,requestBodyLength,mocks[i])
            if(qParamMatched && reqBodyMatched){
                responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req,res,mocks[i],responseHeadersLength,i)
                break;
              }
        }else if(headersLength>0){
          allHeadersValueMatched= matcherUtil.headersMatched(req,headersLength,mocks[i])
          if(allHeadersValueMatched){
            responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req,res,mocks[i],responseHeadersLength,i)
            break;
          }
        }else if(queryParamLength>0){
          allValueMatched= matcherUtil.qParamMatched(req,queryParamLength,mocks[i])
          if(allValueMatched){
            responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req, res,mocks[i],responseHeadersLength,i)
            break;
          } 
        
        }else if(requestBodyLength>0 && req.body!=null){
          allValueMatched= matcherUtil.reqBodyMatched(req,requestBodyLength,mocks[i])
          if(allValueMatched){
            responseObject=matcherUtil.prepareResponseObjectAndCheckForCallback(req, res,mocks[i],responseHeadersLength,i)
            break;
          } 
        }else {
          index = i;
          responseObject.configURL = mocks[i].endPoint;
          responseObject.responseSuccessData = mocks[i].body;
          responseObject.statusCode= mocks[i].statusCodes;
          responseObject.responseTime = dynamicResponse(index);
          if(responseHeadersLength>0){
            for(let a= 0 ;a<responseHeadersLength ;a++){
              res.header(mocks[i].responseHeaders[a].key,mocks[i].responseHeaders[a].value)
            }
          }
          if(mocks[i].callBack.length>0){
            sendCallback.callback(req,mocks[i],start_time);
          }
          dynamicResponselength =mocks[i].dynamicResponse.length;
          if(dynamicResponselength>0){
            responseObject.responseSuccessData=matcherUtil.updateResponseBody(req,mocks[i] ,dynamicResponselength)
          }
          break;
        }     
      }
    }
    //contentType = response.getHeader(req);
    //This function sends the actual response
    send_res.sendResponse(req,contentType, res,responseObject.configURL, responseObject.responseSuccessData, responseObject.responseTime,start_time,responseObject.statusCode);
  }
  
  
  module.exports = appendPointDataSetConfig;
  
