//User can write any new function in this file using similar syntax as below and give same name in key field of config file
//Use req variable is exposed to access request object which cntains request body,header
//Use req.query to access URL parameters for example req.query[req_key]
//Use req.body to access body parameters for example for accessing any key in body of a post request use req.body[req_key] where req_key variable is fixed you can use any variable name while defining function arguements
var date = new Date();
class Merchant {
      id
      key
      constructor(id, key) {
          this.id = id
          this.key = key
      }
    }


module.exports =
{

      random: function () {
            //This function computes a random 10 digit value. Use this function in config if 10 digit random value is needed
            random = 1000000000000 + Math.floor(Math.random() * 9000000000000);
            return random
      },
      getRequest: function (req, req_key,delimiter,indexOfValue)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {     
            if(delimiter!=null && indexOfValue!=null){
                  return req.query[req_key].toString().split(delimiter)[indexOfValue];
                }
               return req.query[req_key];
      },
      getRequestArrayMapping: function (req, req_key,delimiter)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {
            return req.query[req_key].toString().split(delimiter);
      },
      getRequestInteger: function (req, req_key)
      {
            return parseInt(req.query[req_key]);
      },
      static: function (i)
      //This function will return a static value which is passed inside the function
      {
            return i;
      },
      getHeader: function (req)
      //User can set any specific header according to requirement. By default request Content type will be set as response content type
      {
            contentType = req.headers['content-type'];
            return contentType;
      },
      postRequest: function (req, req_key,delimiter,indexOfValue)
      //Use below function in config file for parsing nested Json and XML
      {
            var id = jsonQ(JSON.stringify(req.body));
            console.log("value is "+JSON.stringify(id));
            if(Array.isArray(key)){
                  replace=id.pathValue(req_key);
              }
            newVal = id.find(req_key).value();
            if(delimiter!=null && indexOfValue!=null){
                  return newVal[0].toString().split(delimiter)[indexOfValue];
                }
            return newVal[0];
      },
      getPathParam: function (req, i)
      //This function takes the request object named as req and parses the endpoint to find the value of req_key in request parameters
      {
            return req.params[0].split('/')[i];
      },
      trimingNonSignificantZero: function (req, req_key)
      // 
      {
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            //console.log(" value is "+ val);

            //remove the trailing zeros 
            valTrail=val.toString().slice(0, -2);
           // console.log(" value after removing tariling zeros "+ valTrail);
            //remove the leading zeros 
            var newVal =valTrail.toString().replace(/^0+/, '');
            return Number(newVal);
      },
      convertingIntegerToString: function (req, req_key)
      // 
      {
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 

            return val.toString();
      },
      convertingFloatToInteger: function (req, req_key)
      // 
      {
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 

            return Math.trunc(val);
      },
      decodeRequestBodyAndFindValueString: function (req, req_key)
      // 
      {
            const keyApp = 'GSDganoBT8PvP4YE3sMpHo12EpnY9$4y'
            const algorithm = 'aes-256-cbc'
            console.log(req.headers['timestamp'])
            const timestamp = req.headers['timestamp']
            const timestampLength = 16
            let iv=timestamp.padEnd(timestampLength, '0')
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keyApp), iv)
            let encrypted = Buffer.from(req.body.toString(), 'base64')
            let decrypted = decipher.update(encrypted)
            decrypted = Buffer.concat([decrypted, decipher.final()])
            text = decrypted.toString()
            var id = jsonQ(text);
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 
            return val.toString() ;
      },
      decodeRequestBodyAndFindValueInteger: function (req, req_key)
      // 
      {
            const keyApp = 'GSDganoBT8PvP4YE3sMpHo12EpnY9$4y'
            const algorithm = 'aes-256-cbc'
            console.log(req.headers['timestamp'])
            const timestamp = req.headers['timestamp']
            const timestampLength = 16
            let iv=timestamp.padEnd(timestampLength, '0')
            let decipher = crypto.createDecipheriv(algorithm, Buffer.from(keyApp), iv)
            let encrypted = Buffer.from(req.body.toString(), 'base64')
            let decrypted = decipher.update(encrypted)
            decrypted = Buffer.concat([decrypted, decipher.final()])
            text = decrypted.toString()
            var id = jsonQ(text);
            val = id.find(req_key).value();
            //console.log(" value is "+ val);
            //convert the integer to string 
            return Number(val);
      },
      generateSakukuSignature: function(req){
            accessToken = "5c562d58-844d-4129-b61b-74250f5ade0e"
            paymentId = "E112D0E6B38459D1E05400144FFBA584"
            raw = accessToken + req.body.TransactionID + Number(req.body.Amount) + ".00" + paymentId
            const signature = crypto.createHash('sha256').update(raw).digest('hex');
            return signature
      },
      generateKlikPayAuthKey: function(req){
            transactionNo= req.body.transactionNo;
            console.log(" transactionNo is "+ transactionNo);
            const klikPayKeyId = "303279334B546C4B6F52506530306965"
            const klikPayCode = "1234567890".padEnd(10,'0')
            transactionNo = transactionNo.padEnd(18, 'A')
            const currency = "IDR".padEnd(5, '1')
            const transactionDate = "1970-01-01 00:00:00".padStart(19, 'C')
            let keyId1 = klikPayKeyId.padEnd(32, 'E')
            let keyId2 = keyId1.padEnd(48, keyId1)
            let raw = klikPayCode + transactionNo + currency + transactionDate + keyId1
            let md5 = crypto.createHash('md5').update(raw).digest('hex')
            let authKey = md5.toUpperCase()
            authKey = evaluate.encrypt3DES(keyId2, authKey)
            console.log(" Authentication key  is "+ authKey.toUpperCase());
            return authKey.toUpperCase()
      },
      encrypt3DES : function(key,data){
            const algorithm = 'des-ede3'
            let keySpec = Buffer.from(key, 'hex').toString('utf8')
            let cipher = crypto.createCipheriv(algorithm, keySpec, null)
            let encrypted = cipher.update(data, 'hex')
            return encrypted.toString('hex')
      },
      klikPayRequestBodySOAP : function(req,reqPath){
            body ='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><tiket:PaymentIPAY xmlns:tiket="urn:www.tiket.com"><InputPaymentIPAY><klikPayCode>1234567890</klikPayCode><transactionNo>txn1</transactionNo><transactionDate>2022-06-01 16:46:00</transactionDate><currency>IDR</currency><totalAmount>2000</totalAmount><payType>01</payType><approvalCode><fullTransaction>true</fullTransaction><installmentTransaction>false</installmentTransaction></approvalCode><authKey>auth1</authKey><additionalData></additionalData></InputPaymentIPAY></tiket:PaymentIPAY></soap:Body></soap:Envelope>'
            txn1 = util.jsonPathToValue(req.body,reqPath);
            auth1= evaluate.generateKlikPayAuthKey(req);
            console.log("klikPayRequestBodySOAP txn1 "+txn1);
            console.log("klikPayRequestBodySOAP auth1 "+auth1 );
            let result = body.replace("txn1", txn1).replace("auth1",auth1);
            return result;
      },
      valueFromPathParam : function(req,index){
            var url =req.originalUrl;
            url =url.split("/")
            console.log("printing the path value");
            console.log(url[index]);
            return url[index];
      },
      appendTextToRedirectUrlBilipay : function(req,req_key){
            var url ='https://dompetqa1-api.mcdomo.id/blipay/member?token=ea484cb7-de70-4ba2-a6a7-b0f484a0563b&';
            var id = jsonQ(JSON.stringify(req.body));
            val = id.find(req_key).value();
            let result = url.concat(val);
            console.log("printing the value of redirect url ");
            console.log(result);
            return result;
      },
      generateBlipaySignature : function(req){
            const statusCode = '200'
            const serverKey = 'SB-Mid-server-2DiXmQDUOc30sQT24mUBAB16'
            const algorithm = 'sha512'
            const digest = 'hex'
            var id = jsonQ(JSON.stringify(req.body));
            orderId = id.find('order_id').value();
            grossAmount = id.find('gross_amount').value();
            console.log("printing the value of order id and grossamount for method  generateBlipaySignature");
            console.log(orderId);
            console.log(grossAmount);
            let input = orderId + statusCode + grossAmount + serverKey
            let signature = crypto.createHash(algorithm).update(input).digest(digest)
            return signature
      },
      mapValueFromQueryParamToResponseBody : function(req,key){
            const value =req.query[key]
            return value
      },
      generateNicepayVaToken: function(req){
            var id = jsonQ(JSON.stringify(req.body));
            bankCd = id.find('bankCd').value();
            amount = id.find('amount').value();
            const trxId = 'TIKETMOCK0000000000000000000000'
            let merchant = evaluate.getMerchant(bankCd)
            let textToken = merchant.id + trxId + amount + merchant.key
            let hash = crypto.createHash('sha256').update(textToken).digest('hex')
            return hash
      },
      getMerchant:function(bankCd) {
            console.log("Bank code is : ");
            console.log(bankCd[0]);
            
            const bniMerchant = new Merchant(
                  'TIKETBNI01',
                  'Qi2R1rCMRnW01DOft9zwXLyaHeG19TSgqAVPom5BLJ3M5QcwDAx3crSyUT2PilVMYHiVjpMhqbf+nWn+V5rzaw=='
            )
                
            const mandiriMerchant = new Merchant(
                  'TIKET00010',
                  'NEZmIHoZ4OfwZw90NLi2wl65PHLeCfi1Isde+TMBTapVCbuAKu5EYtIkxDJDxI8X5W/PA7eACdo/bjf3N6vHPA=='
            )
                
            const defaultMerchant = new Merchant(
                  'TIKET00001',
                  'S9/vgka6pyF9FsN0zH5mnfUNKIcHEMo084hbLufQyvFgrp+YKPfq2Fy187aKlM5X/0Z/A0uZoQ8jcpvf1RBI2A=='
            )
            switch (bankCd[0]) {
                  case 'BNIN':
                      console.log("getMerchant : BNIN");
                      return bniMerchant
                  case 'BMRI':
                      console.log("getMerchant : BMRI");
                      return mandiriMerchant
                  default:
                      console.log("getMerchant : default");
                      return defaultMerchant
              }    
      },
      generateOctoClicksSignature : function (req) {
            refNo= req.body.RefNo;
            amount= req.body.Amount;
            amount = Math.trunc(amount);
            console.log("amount is "+amount);
            currency=req.body.Currency;
            const merchantkey = 'LkKDbS0ozX'
            const merchantCode = 'IF00010'
            let paymentId = refNo
            let status = '1'
            let signature = merchantkey + merchantCode + paymentId + refNo + amount + '00' + currency + status
            let sha = crypto.createHash('sha1')
            let key = sha.update(signature).digest('base64')
            return encodeURIComponent(key)
    }

}




