const fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

let base64str = base64_encode('2018-05-06-022322.jpg');

console.log(base64str);

let buf = Buffer.from(base64str, 'base64');

fs.writeFile("result.txt", base64str, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});