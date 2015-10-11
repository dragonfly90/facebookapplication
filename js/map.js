//Data
var cities = [
    {
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        long : -79.4000
    },
    {
        city : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 40.6700,
        long : -73.9400
    },
    {
        city : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];


function myFunction(arr)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "photo/json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);

            return myArr
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



var xmlhttp = new XMLHttpRequest();
var url = "photo/json";
var events;

xmlhttp.onreadystatechange = function() {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log("true")
        var myArr = JSON.parse(xmlhttp.responseText);
        events= myArr["data"]
        console.log(events.length)
        myFunction2(myArr["data"])
        initMap(events)
    }

}

function initMap(events) {
    var myLatLng = {lat: 35, lng: -80};

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 7
    });
    var i;
    for(i = 0; i < events.length; i++) {
        // Create a marker and set its position.
        var myposition={lat:events[i]["latitude"], lng:events[i]["longitude"]}
        var marker = new google.maps.Marker({
            map: map,
            position: myposition,
            title: events[i]["name"]
        });

        var infoWindow = new google.maps.InfoWindow();

        marker.content = '<div class="infoWindowContent">' + events[i]["description"] + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open(map, marker);
        });
    }
}

/*
console.log(events)


var map = {};

//Angular App Module and Controller
var MapModule = angular.module('mapsApp', ['ngRoute']);

console.log(events)
MapModule.controller('MapCtrl', function ($scope) {



    console.log("false")
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(35.0, -80.0000),
        // mapTypeId: google.maps.MapTypeId.TERRAIN

    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info["latitude"], info["longitude"]),
            title: info["name"]
        });
        marker.content = '<div class="infoWindowContent">' + info["description"] + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
        return marker;

    }


    for (i = 0; i < events.length; i++){
        map[i] = createMarker(events[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});

MapModule.controller('EventBoxCtrl', function ($scope) {
    $scope.hoverIn = function() {
        map[1].setIcon("http://www.googlemapsmarkers.com/v1/A/0099FF/");
    }

    $scope.hoverOut = function() {
        map[1].setIcon("http://www.googlemapsmarkers.com/v1/A/0099FF/");
    }

});
*/
xmlhttp.open("GET", url, true);
xmlhttp.send();
function myFunction2(events) {
    var mystr = '<div class="col-md-4 ">\
                            <div class="service-box" ng-mouseover="hoverIn(numberid)" ng-mouseleave="hoverOut(numberid)">\
                            <a href="#">\
                            <img class="img-responsive" src="photo/cover/image" alt="">\
                            </a>\
                            <h3>projectname</h3>\
                            <p class="text-muted">description</p>\
                           </div>\
                           </div>'
    var j;
    var allstr='<div class="col-md-12">'
    var currentstr
    for (j = 0; j < Math.min(events.length, 6); j++) {
        currentstr = mystr
        var tempstr = j;
        tempstr.toString()
        currentstr = currentstr.replace("numberid", tempstr)
        currentstr = currentstr.replace("numberid", tempstr)
        currentstr =currentstr.replace("image",tempstr+".jpg")
        currentstr = currentstr.replace(/projectname/i, events[j]["name"])
        currentstr = currentstr.replace(/description/i, events[j]["description"].substring(0, 80))
        allstr +=currentstr

        if((j+1)%3==0&&j!=Math.min(events.length,6)-1)
        {
            allstr +='</div><div class="col-md-12">'
        }
    }

    allstr +='</div>'


    document.getElementById("rowevents").innerHTML = allstr;

    console.log("1")

}


