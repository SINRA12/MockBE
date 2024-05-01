module.exports =
{
     callback: function(req, apiData, start_time){
      var headers= JSON.parse(apiData.callBack[0].headers);
      console.log(headers);
      console.log(apiData.callBack[0].protocol);

      headerString = apiData.callBack[0].headers;
      console.log("===============================================");
      console.log(headerString);

      var protocol= apiData.callBack[0].protocol;

      var options = {
        "host": apiData.callBack[0].host,
        "port": apiData.callBack[0].port,
        "path": apiData.callBack[0].path,
        "method": apiData.callBack[0].httpMethod,
        "headers":headers
      }
      console.log(JSON.stringify(options));
      var callbackTime=apiData.callBack[0].delay;
      var reqBodyCB=apiData.callBack[0].requestBody;
      var dynamicCallabckReqlength=apiData.dynamicRequestCallback.length;

      if(dynamicCallabckReqlength>0){
        reqBodyCB=matcherUtil.updateRequestBodyCallback(req,apiData ,dynamicCallabckReqlength);
        console.log(reqBodyCB);
      }
      console.log("===========================================================================================");
      console.log(reqBodyCB);


      if(callbackTime!=null){
        responseTime=callbackTime;
      }
      setTimeout(function () {
        //switch case conditions
        var httpMethod = apiData.callBack[0].httpMethod;
        switch(httpMethod){
           case 'POST':
            if(protocol=='https') {
              httpsUtil.post(options,reqBodyCB);
            }else{
              httpUtil.post(options,reqBodyCB);
            }
            
            break;
        }
       console.log(/*Date.now() + ", " + "s*/" Success" + ", " + apiData.endPoint + ", " + (new Date().getTime() - start_time) + ", ");
    }, responseTime); 
        
      return;
    }
}
