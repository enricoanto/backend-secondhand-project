require('dotenv').config()

// google-firebase
var admin = require("firebase-admin");
var serviceAccount = require("./google-firebase");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL,
    storageBucket: process.env.BUCKET_URL
});
// end

module.exports = admin