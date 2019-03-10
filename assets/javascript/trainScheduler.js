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
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var freq = childSnapshot.val().freq;
    var arrival = getArrival(time, freq);
    var mins = moment(arrival, "HH:mm").fromNow();

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(arrival.format("HH:mm")),
        $("<td>").text(mins)
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
});

function getArrival(time, freq) {
    var day = moment().format("YYYYMMDD");
    var date = moment((day + time), "YYYYMMDDHH:mm");
    var hr = moment().format("HH");
    var hr1st = date.format("HH");
    var min = parseInt(date.format("mm"));

    var added = 0;
    var times = [];

    for (i=0; freq*i<60; i++) {
        newTime = min + freq * i;

        if (newTime >= 60) {
            newTime -= 60;
        }

        var m = moment((day + hr + newTime), "YYYYMMDDHH:mm");
        
        if (m < moment()) {
            m = moment((day + hr1st + newTime), "YYYYMMDDHH:mm");
            times.push(m.add(1, 'days'));
        } else {
            times.push(m);            
        }

    }

    var closest = times[0];
    for (i=1; i<times.length; i++) {
        var dif = times[i] - moment();
        var dif2 = times[i-1] - moment();
        if (dif < dif2) {
            closest = times[i];
        }
    }
    

    return closest;
}
