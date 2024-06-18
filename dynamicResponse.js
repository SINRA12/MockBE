var respTime_1,respTime_2,responseTime;

// function will check for each data-set's range response delay and return a dynamic response both range and static value

var dynamicResponse = function dynamicResponse(IndexValue)
{    
		//This code is used when there is a fixed response Delay
		responseTime = mocks[IndexValue].delay;
		return responseTime;

}
module.exports = dynamicResponse;
