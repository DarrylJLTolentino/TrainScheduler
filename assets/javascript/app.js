var firebaseConfig = {
    apiKey: "AIzaSyCHJDdfS9tH2QCBJWAh9da6VfeNIyMVhck",
    authDomain: "testproject-68489.firebaseapp.com",
    databaseURL: "https://testproject-68489.firebaseio.com",
    projectId: "testproject-68489",
    storageBucket: "testproject-68489.appspot.com",
    messagingSenderId: "317718905956",
    appId: "1:317718905956:web:fdc72cdcce4456ee"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function () {
    var trainName = $("#train-name").val().trim();
    var destinationName = $("#destination-name").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destinationName,
        firstTrain: firstTrain,
        frequency: frequencyInput
    };

    database.ref().push(newTrain);
    $("#train-name").val("");
    $("#destination-name").val("");
    $("#first-train").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(snapshot) {
    var newTR = $("<tr>");
    var name = $("<td>").text(snapshot.val().name);
    var destination = $("<td>").text(snapshot.val().destination);
    var frequency = $("<td>").text(snapshot.val().frequency);
    var firstTrain = snapshot.val().firstTrain;
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var trainFrequency = snapshot.val().frequency;
    var remainingTime = diffTime % trainFrequency;
    var minutesTillTrain = trainFrequency - remainingTime;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextArrival = $("<td>").text(moment(nextTrain).format("hh:mm"));
    var minutesAway = $("<td>").text(minutesTillTrain);
    newTR.append(name, destination, frequency, nextArrival, minutesAway);
    $("tbody").append(newTR);
});