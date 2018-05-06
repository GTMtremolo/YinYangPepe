var FCM = require('fcm-push');

var serverKey = 'AAAAJpVeXrk:APA91bF4xgdo8pGIbLzyy4uv4kotwOFur_1VE31S43ExWJsolgEaceMSNnKmxa7N_moQ2qN2aH1b4sdDHDs6vWVEhxWMftoko_2XgEQ3pEWH7ealVz3kmIjgUN7r_p0BAhXBUOMLYoel';
var fcm = new FCM(serverKey);

var message = {
    to: 'dup-5WcG9yM:APA91bEz5-iXBuv3Ia72AXzjiYwBPs3ZNRNbL7XgQ3S3uV57SCWlAhsXEPwu3668PKZqi3RTxFFfkHmQpLATBOBrASoJ5i1JtUGTPL4xnOTBwSNOLLe-UDTwFerMCNR8eTqqlb2I5GzU', 
    data: {
        imgLink: `http://10.22.17.181:300/imgs/${}`
    },
    notification: {
        title: 'Title of the push notification',
        body: 'Body of the push notification'
    }
};

//callback style
fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!");
        console.log(err);        
    } else {
        console.log("Successfully sent with response: ", response);
    }
});