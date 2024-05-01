module.exports ={
        /**
 * Converts a string path to a value that is existing in a json object.
 * 
 * @param {Object} jsonData Json data to use for searching the value.
 * @param {Object} path the path to use to find the value.
 * @returns {valueOfThePath|null}
 */
     jsonPathToValue :function (jsonData, path) {
        if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
            throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
        }
        path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        path = path.replace(/^\./, ''); // strip a leading dot
        var pathArray = path.split('.');

        var keys = Object.keys(jsonData);
        for (var i = 0; i < keys.length; i++) {
          console.log(jsonData[keys[i]]);
        }

        for (var i = 0, n = pathArray.length; i < n; ++i) {
            var key = pathArray[i];
            if (key in jsonData) {
                if (jsonData[key] !== null) {
                    jsonData = jsonData[key];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return jsonData;
    },
    xmlPathToValue :function (xmlData, key) {
        json = JSON.parse(xmlData); 
        var id = jsonQ(xmlData);
        value = id.find(key)[0] 
        console.log(value)
        return value
    },
    onExtract :function(key, data){
        if (util.isObject(data)) {
            for (let item in data) {
              if (key === item) {
                return data[item];
              }
              const res = util.onExtract(key, data[item]);
              if (res !== null) return res;
            }
          }
          if (util.isArray(data)) {
            for (let item of data) {
              const res = util.onExtract(key, item);
              if (res !== null) return res;
            }
          }
          return null;
    },
    isObject :function(obj){
        return Object.prototype.toString.call(obj) === "[object Object]";
    },
    isArray :function(arr){
        return Object.prototype.toString.call(arr) === "[object Array]";
    }
}
