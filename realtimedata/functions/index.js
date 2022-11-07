const functions = require("firebase-functions");

let admin = require("firebase-admin");
const cors = require("cors")({origin:true});
// Fetch the service account key JSON file contents
let serviceAccount = require("./realtimehoon-firebase-adminsdk-13u15-36bbfcdc07");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realtimehoon-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
let db = admin.database();
let ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response,()=>{
        db.ref("msgs").on("value",(snapshot)=>{
            response.send(snapshot.val());
        });
    });

});


exports.ceocamp = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {
        structuredData: true
    });

    let hoon = {
        name: "김경훈",
        age: 37,
        height: 173
    }
    response.send(hoon);
});
