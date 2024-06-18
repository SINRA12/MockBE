# MockBE
This is a BE service that will support the UI of the mock server 

Welcome to Generic Mock!
===================


API Mocking is a way to test the functionality of a API in isolation. Instead of developing code with actual external dependencies in place, a mock of those dependencies can be created and used instead.

-------------
## Getting Started

### Prerequisites

Before you can run the test, you need to have:  

1  npm
```
sudo apt install npm
```
2  Node.js
```
Currently this framework is not supported on node latest versions due to some libraries not work on all operating systems, please execute below commands to install supported version.
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n 8.10.0

Note : If above command does not work please go to this link https://linoxide.com/linux-how-to/install-install-nodejs-linux/
```
### Installing

Follow these steps on the machine you want to use Generic mock tool.

1 - Clone the repository after taking required permissions
```
git clone git@github.com:Tushar-Tiket/GENERIC_MOCK.git
```

2 - switch to projects home folder
```
cd digital-performance-testing/Generic_mock/ or cd Generic_mock
```
3  Install dependencies
```
npm install //If any library is not installed install it manually(library names will come while executing the main.js file) using npm install 'library-name'
```
How to run
--------------------
 1. Go to config folder
 2. Open data.js file in any editor for example notepad,atom,visual studio etc. Fill the below fields -
 3. Update the configurations according to your mock requirement -
   4. **requestType** - HTTP method like GET,POST,PUT,DELETE
   5. **endPoint** - Mandatory field. API Endpoint name. It is regex based i.e user can define their own regex expressions.
   6. **responseTime** - Response time delay in milliseconds, mandatory to fill. Value should be filled in array form[]. It can have a single value or 2 values with comma separated for providing delay in range.
   7. **sucessPercentageRatio** - Mandatory field. It is used to define number request required for success and fail. Value is given in single or double quotes '' or "". for example '50' means 50% request should return success and 50% should return failure.
   8. **responseSuccessFilePath** - File path for the response file to be provided in case of success. File should be with XML or JSON format and should be present in responseFiles folder if dynamic response required. This field is optional but default file path("./responseFiles/res_Pass.json") should be provided when sucessPercentageRatio != 100. Values should be given in single or double quotes.
   9. **responseFailFilePath** - This is used to define the file path for the response to be send in case of failure. File should be in XML or JSON format. Field is optional and becomes mandatory when sucessPercentageRatio != 100.
   10. **responseFailStatusCode** - This field is used to define the status code to be send in case of failure.Value can be provided directly without and single or double quotes or with quotes. Field is mandatory if sucessPercentageRatio != 100.
   11. **enableDynamicResponse** - This is a flag used to send dynamic response. Used when user wants to receive a dynamic response in case of success. Value is optional can be true/false. Key Values should be given in single or double quotes.
   12. **key** - This field is mandatory only if **enableDynamicResponse** is true.This field is used to define the function/logic to compute value for dynamic response.Value is declared in array form like **[[]]**. Each block(comma seperated) contains two arguements first represents the key of response file to be updated and second is the function(present in evaluate.js file) which can be accessed using response keyword only to compute new value. The function should be declared in function format like **function()** and same should be defined/present in **evaluate.js file**. Argument can be pass through functions if required for ex function(2).
                 For ex key:[["client_id",'response.postRequest(req,"mob_no")']] //where client_id is present in response file and mob_no is present in request body. Here client_id will be replaced by value of mob_no key present in request body. 
				 OR user can define their own function/logic in evaluate.js file and function must be accessed using response keyword for 
				 ex [["mob_no",'response.random()'],["customer_id",'response.random()']].
    **Note**: User can update single/multiple keys of a response file.

   13. After all the configurations use below commands to **run the service** Please refer monitoring link at the end of the page for monitoring support-
    `node main.js| grep --line-buffered ','>>test.csv` will execute service on default port i.e 3001. This will run node service on 1 CPU core
    `PORT='' node main.js| grep --line-buffered ','>>test.csv` This will execute service on user specified port
	`node cluster main.js| grep --line-buffered ','>>test.csv` To run on all CPU cores for maximum TPS support use this command.It will run on 8 CPU cores as per your machine availability.

**Note :** The key that user wants to update must be present in response file provided and if the new value is being computed by any key of request body then the request body must contain that key. 

Important Folders and their usage
-------------------

 1. **responseFiles** - Should consist all the response files in json/xml format to be send as a response. It consists response files for both failure and success cases.
 2. **config folder** - It consist the configuration file named as data.js, user should give each mock API request in form of array blocks as given below each new block should be comma seperated-

	    {
			requestType:'',
			endPoint:'',
			responseTime:[],
			sucessPercentageRatio:'',
			responseSuccessFilePath:'./responseFiles/res_Pass.json',//this is default file provided
			responseFailStatusCode:,
			responseFailFilePath:'',
			enableDynamicResponse:'',
			key:[[]],
			loggingEnable:'false' //Flag is provided for creating logs in case debugging required.
		}
3 **evaluate.js** : File consist of the function to compute the new value to be send when dynamic response is required. By default it consist some functions for users help, their usages are explained in the file. For ex static function is used to replace value of key with any value provided as an argument in function like [[status,response.static(203)]] this will replaces the status key(of provided response file) with 203 in case of success response.

 **Note :** loggingEnable is provided for debugging. Default value is false change it to true to print logs in a file named as log.txt the logs will contain request timestamp,req endPoint and response, and total time spend in computing response(excluding network latency). Ensure that the value should remain false in case of actual run.

Limitations
-----------

 1. Dynamic response functionality is only supported for json/xml request types.
 2. User must follow the same structure as given above any change in the structure or syntax will cause a failure,please refer to Fag page link provided at the end for known errors.


Steps to create a new mock API with an example
------------------------------
Suppose you want to create a mock API which should return 80% of total requests as success and rest 20% as failure in response.
You have below parameters -

	1 Success JSON data in case of success
	2 A fail status code in case of failure
	3 Response JSON data which should be received in failure case
	4 You have a delay/response time value like 1 sec

You should follow below steps -
-----------------------------
	1: First open the response folder and put your response files including success and fail files both.
	2: Open config/data.js file in any editor.
	3: Remove the default parameter values.
	4: Put the API endpoint in Endpoint field.
	5: Each key to be updated should be given in blocks as {}, which should be seperated by ','.
	6: Now give the file name in the successfilepath in case of successful requests.Always put ./responseFiles/ before file name
	7: Give the file name path in the failfilepath in case of fail requests.
	8: Input the delay value in response time field. It can be single or in range defined with two values(with comma seperated).
	9: Input the successpercentage required in sucessPercentageRatio field.
	10: Input fail status code in responseFailStatusCode field.
	11: Now save the changes.
	12: Go to Generic_mock folder execute it using node command like node main.js server will run on default port 3001.
	13: If you want to change the port suppose want to run on 3002 port then use PORT=3002 node main.js| grep --line-buffered ','>>test.csv command.
	14: If their is any incorrect configuration it will be shown on the console. Correct errors and run again.

