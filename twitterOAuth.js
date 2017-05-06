exports.handler = (event, context, callback) => {
    var https = require('https');
    var http = require('http');
    var body = '';
    var website_callback = 'http://finapp.vezcore.com/';
    var base_URL = 'https://api.twitter.com/oauth/request_token';
    
    //require the crypto package in order to generate a random 16 byte character string for the nounce parameter
    //The oauth_nonce parameter is a twitter required header parameter that is a unique token that the application should generate for each unique request.
    //Twitter will use this value to determine whether a request has been submitted multiple times.
    var crypto = require('crypto');
    var nonce_token = crypto.randomBytes(16).toString('hex');
    
    //he oauth_timestamp parameter indicates when the request was created. Twitter will reject requests which were created too far in the past,
    var timestamp = Math.floor(Date.now() / 1000);
    
    DST = '';
    DST = DST + encodeURIComponent('oauth_callback');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(website_callback);
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_consumer_key');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('AYX7QZOaecX6NsoQ8N5bmpSCs');
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_nonce');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(nonce_token);
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_signature_method');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('HMAC-SHA1');
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_timestamp');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(timestamp);
    DST = DST + '"';
    DST = DST + ', ';    
    
    DST = DST + encodeURIComponent('oauth_version');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('1.0');
    DST = DST + '"';
    
        console.log(DST);
    
    var parameter_string = DST.replace(/['"]+/g, '');
    parameter_string = parameter_string.replace(/[', ]+/g, '&');

    var signature_base_string = 'POST&';
    signature_base_string = signature_base_string + encodeURIComponent(base_URL);
    signature_base_string = signature_base_string + '&';
    signature_base_string = signature_base_string + encodeURIComponent(parameter_string);
    var signing_key = encodeURIComponent('WxaXu2RHPcYDBXRCYwp4mC6vCciVbL2iWgJCXyF1d6eYpWSUuO');
    signing_key = signing_key + '&';
    var hmac = crypto.createHmac('sha1', signing_key);
    hmac.update(signature_base_string);
    var signature = hmac.digest('base64');
    
    DST = '';
    DST = DST + 'OAuth ';
    DST = DST + encodeURIComponent('oauth_callback');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(website_callback);
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_consumer_key');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('AYX7QZOaecX6NsoQ8N5bmpSCs');
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_nonce');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(nonce_token);
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_signature');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(signature);
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_signature_method');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('HMAC-SHA1');
    DST = DST + '"';
    DST = DST + ', ';
    
    DST = DST + encodeURIComponent('oauth_timestamp');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent(timestamp);
    DST = DST + '"';
    DST = DST + ', ';
    
   /* DST = DST + encodeURIComponent('oauth_token');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('15997023-4YfxuBBK1J6tbA1W0j7ekZvP9iDazjukkEGDPi0P3');
    DST = DST + '"';
    DST = DST + ', ';*/
    
    DST = DST + encodeURIComponent('oauth_version');
    DST = DST + '=';
    DST = DST + '"';
    DST = DST + encodeURIComponent('1.0');
    DST = DST + '"';

   var options = {
        host: 'api.twitter.com',
        path: '/oauth/request_token',
        method: 'POST',
        headers: {'Authorization': DST}
    };
    
    var req = https.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log('Body: ' + body);
        });
    });
    req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    });
    // write data to request body
    //req.write('{"string": "Hello, World"}');
    req.end();

    /*https.get(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            //return chunk;
        });
    });*/
    callback(null, 'Hello from Lambda');
};
