const firebaseConfig = {
  apiKey: "AIzaSyCruGBoPNcBl26GLWV-DkzF9aSKRWt_WIo",
  authDomain: "khcodecamp.firebaseapp.com",
  databaseURL: "https://khcodecamp-default-rtdb.firebaseio.com",
  projectId: "khcodecamp",
  storageBucket: "khcodecamp.appspot.com",
  messagingSenderId: "320799961551",
  appId: "1:320799961551:web:fecd1bc870e660b54ce2ba",
  measurementId: "G-Z86D2ZPTNM"
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();


function sendMsg(){
    let date = new Date();
    let msg = $("#message").val();
    database.ref("msgs/"+date.getTime()).set(msg);
    $("#message").val("");
}

function loadMsgs(){
    database.ref("msgs").on("value", callback);
    function callback(snapshot){
        $("#chatlist").html("");
        console.log(snapshot);
        snapshot.forEach(function(child){
             $("#chatlist").append("<div>"+child.val()+"</div>");
        });
        $("#chatlist").scrollTop(15000);
    }
}
