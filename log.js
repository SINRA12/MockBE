
module.exports =
{
  //This function is used to generating logs in log file in the same project directory
  logging: function (status, startTime, req, responseData) {
    if (typeof responseData === 'object') {
      responseData = JSON.stringify(responseData);
    }
    // else if (typeof responseData === 'string' && responseData.startsWith('{') && responseData.endsWith('}')) {
    //   console.log("ELSE");
    //   console.log(typeof responseData);
    //   responseData = JSON.stringify(responseData, null, '\t')
    // }

// TODO:|FIXME: Reset log file with every new session
    for (let i = 0; i < requestCount; i++) {
      var regex = new RegExp(apiData[i].endPoint);
      if (req.originalUrl.match(regex) && req.method.match(apiData[i].requestType)) {
        if (apiData[i].loggingEnable == 'true') {
          fs.appendFileSync("log.txt", "\n" + new Date().toUTCString() + "\n" + "********** " + "Method: " + req.method + " | Endpoint: '" + req.originalUrl + "' **********");
          fs.appendFileSync("log.txt", "\nStatus: " + status.charAt(0).toUpperCase() + status.slice(1))
          fs.appendFileSync("log.txt", "\n" + "Total Time Elapsed: " + (new Date().getTime() - startTime) + " ms");
          fs.appendFileSync("log.txt", "\n" + "Response: \n" + responseData + "\n");
        }
        else {
          return;
        }
      }
    }
  }
}
