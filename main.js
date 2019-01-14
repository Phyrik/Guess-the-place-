var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGh5cmlrIiwiYSI6ImNqcXRna2h2OTA1bWczeHIycHlwdzVhaHYifQ.d4trYkyPtfmZNeDmLxbQuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var testLoc = [0, 0];
var chosenLoc = [0, 0];
var stage = 0;
var hint = "";

//document.getElementById("stageCounter").innerHTML += stage;

var popup = L.popup();

function changeStage() {
    //document.getElementById("stageCounter").innerHTML = "Stage: ";

    if (stage == 0) {
        stage = 1;
        document.getElementById("stageCounter").innerHTML = "Player 2: Using the hint below, click where you think Player 1 clicked.";
        document.getElementById("next").style.visibility = "hidden";
        hint = document.getElementById("hintTxtBx").value;
        document.getElementById("hintTxtBx").style.visibility = "hidden";
        document.getElementById("hint").innerHTML = hint;
        return;
    }
}

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    //console.log(c * EARTH_RADIUS * 1000);
    return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
    return degree*Math.PI/180;
}



function onMapClick(e) {
    var clickPos = [e.latlng['lat'], e.latlng['lng']];

    console.log(console.log("Stage: " + stage));
    console.log(getDistance(clickPos, chosenLoc));

    if (stage == 0) {
        chosenLoc = [e.latlng['lat'], e.latlng['lng']];
    }

    if (stage == 1) {
        if (getDistance(clickPos, chosenLoc) < 1000) {
            console.log("Yay!")
            document.getElementById("winner").innerHTML = "Well done, you were within 1000m of the position! But to be exact, you were " + Math.round(getDistance(clickPos, chosenLoc) * 100) / 100 + "m away.";
        }
        else {
            document.getElementById("winner").innerHTML = "Close! Only " + Math.round(getDistance(clickPos, chosenLoc) * 100) / 100 + "m away.";
        }
    }
    /*
    var circle2 = L.circle(e.latlng, {
        color: 'blue',
        fillColor: '#FFFFFF',
        fillOpacity: 0,
        radius: 500
    }).addTo(mymap);

    var distance = getDistance(clickPos, testLoc);
    console.log(clickPos, testLoc);

    popup
        .setLatLng(e.latlng)
        .setContent("You are " + distance.toString() + "m far away.")
        .openOn(mymap);
        */
}

mymap.on('click', onMapClick);