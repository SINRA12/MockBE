module.exports =
{
     post: function(options,requestData){
        const request = http.request(options, (res) => {
            let data = '';  
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('close', () => {
              if(JSON.stringify(options.headers).includes('xml')){
                console.log(res.statusCode);
                console.log(data);              
              }else{
                console.log(res.statusCode);
                console.log((data));
              } 
            });
          });
          
          if(JSON.stringify(options.headers).includes('xml')){
            request.write(requestData);
          }else{
            request.write(JSON.stringify(requestData));
          } 
          console.log(request);
          request.end();
          request.on('error', (err) => {
           console.error(`Encountered an error trying to make a request: ${err.message}`);
         });
        return;
     }
}
