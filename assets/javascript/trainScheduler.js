  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdjRKQK9ziK0IHz7imxUGJ4ttacERqgXI",
    authDomain: "codingolya.firebaseapp.com",
    databaseURL: "https://codingolya.firebaseio.com",
    projectId: "codingolya",
    storageBucket: "codingolya.appspot.com",
    messagingSenderId: "512833136570"
  };

  firebase.initializeApp(config);

  var ref = firebase.database().ref();


$("#submit-btn").on("click", function(){
    
    console.log("Pushed: " + train);

    var name = $("#trainName").val().trim();
    var dest = $("#trainDest").val().trim();
    var time = $("#trainTime").val().trim();
    var freq = $("#frequency").val().trim();

    var train = {
        name: name,
        dest: dest,
        time: time,
        freq: freq
    }

    ref.push(train);


});

ref.on("child_added", function(childSnapshot) {

    var time = childSnapshot.val().time;
    var date = getDate(time);
    console.log("time:" + time);

    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var freq = childSnapshot.val().freq;
    var arrival = time;
    var mins = moment.unix(time, "HH:mm").fromNow();

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(arrival),
        $("<td>").text(mins)
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
});

function getDate(time) {
    var day = moment.unix().format("YYMMDD");
    return moment.unix((day + time), "YYMMDDHH:mm");
}
