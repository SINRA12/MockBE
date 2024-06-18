//global variables which are accessible in all files, all library are imported in main file
const
  express = require('express'),
  app = express();

http = require('http');
https = require('https');
const fs = require('fs');
const httpPort = 3001;
const httpsPort = 3002;
bodyParser = require('body-parser');
appendpointDataSetConfig = require("./index.js");
dynamicResponse = require("./dynamicResponse.js");
evaluate = require("./evaluate.js");
send_res = require("./sendResponse.js");
util = require("./util.js");
matcherUtil = require("./matcherUtil.js");
log = require("./log.js");
requestCount =0;
mocks="" ;
jsonQ = require("jsonq");//used for json parsing
random = require('random');
parser = require('xml2json'); //Used for XML request parsing
xmlparser = require('express-xml-bodyparser');
const mongoose = require('mongoose');
const mockDb = require('./models/mockSchema');
const { mockSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
var xml2js = require('xml2js');
httpUtil = require("./httpUtil.js");
httpsUtil = require("./httpsUtil.js");
crypto = require('crypto');
sendCallback=require("./sendCallback.js");


var key = fs.readFileSync(__dirname + '/certsFiles/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certsFiles/selfsigned.crt');

var credentials = {
  key: key,
  cert: cert
};

/* mongoose.connect('mongodb://localhost:27017/mocks', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
 */
mongoose.connect('mongodb://root:example@localhost:27017', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//console.log(JSON.stringify(mocks[0].body));

//Below code is to enable the Json parsing library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xmlparser());
app.use(bodyParser.text({type:"*/*"}));

stringify = require('json-stringify-safe');

const validateMock = (req, res, next) => {
  const { error } = mockSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}

//Following are the CRUD operations exposed for changing/ accessing the mocks using restApi   

app.get('/allMocks', catchAsync(async (req, res) => {
  const mocks = await mockDb.find({});
  res.send(mocks);
}));


app.post('/mocks/new',validateMock, catchAsync(async (req, res) => {
  
  //create the db object 
  var mockObj ={ endPoint : req.body.endPoint ,
    statusCodes : req.body.statusCodes,
    contentType : req.body.contentType,
    delay: req.body.delay,
    httpMethod :req.body.httpMethod,
    body : req.body.body
  }

  const mock = new mockDb(mockObj);
  await mock.save();
  res.send(mock);
}));

app.put('/mocks/:id',validateMock, catchAsync(async (req, res) => {
   //create the db object 
   var mockObj ={ endPoint : req.body.endPoint ,
    statusCodes : req.body.statusCodes,
    contentType : req.body.contentType,
    delay: req.body.delay,
    httpMethod :req.body.httpMethod,
    body : req.body.body
  }
  const { id } = req.params;
  const mock = await mockDb.findByIdAndUpdate(id, { ...mockObj });
  res.send(mockObj);
}));

app.delete('/mocks/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await mockDb.findByIdAndDelete(id);
  res.send('Done');
}));


//This will handle all GET and POST calls
app.get('*', async (req, res) => {
  start_time = new Date().getTime();
   mocks = await mockDb.find({}).populate('headers').populate('qparams').populate('requestBody').populate('responseHeaders').populate('callBack').populate('dynamicResponse').populate('dynamicRequestCallback').populate('dynamicRequestCallbackQparams');
   requestCount=mocks.length;
   appendpointDataSetConfig(req, res, start_time);
});

app.post('*', async (req, res) => {
  start_time = new Date().getTime();
   mocks = await mockDb.find({}).populate('headers').populate('qparams').populate('requestBody').populate('responseHeaders').populate('callBack').populate('dynamicResponse').populate('dynamicRequestCallback').populate('dynamicRequestCallbackQparams');
   requestCount=mocks.length;
   appendpointDataSetConfig(req, res, start_time);
});


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).send(err);
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(httpPort, () => {
  console.log("Http server listing on port : " + httpPort)
});

httpsServer.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
});
// For pact provider verification
// module.exports = app

