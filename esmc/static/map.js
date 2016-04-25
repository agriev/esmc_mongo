var currentGeoposition = null;

var initMap = function() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {lat: 55.7558, lng: 37.6173}
	});

	var geoloccontrol = new klokantech.GeolocationControl(map, 14);

	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currentGeoposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(currentGeoposition);

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

	return map;
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  // infoWindow.setPosition(pos);
  // infoWindow.setContent(browserHasGeolocation ?
  //                       'Error: The Geolocation service failed.' :
  //                       'Error: Your browser doesn\'t support geolocation.');
}

var polygonDraw = function(polygon, map) {
  var gm_polygon = new google.maps.Polygon({
    paths: polygon,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  gm_polygon.setMap(map);

  // console.log(gm_polygon);
};

var odhGetFirstCoordinate = function(odh) {
	var coordinate = JSON.parse(odh.geometry.geometry_json).coordinates[0][0][0];
	return new google.maps.LatLng(coordinate[1], coordinate[0]);
}

var odhGetGoogleMapsPolygon = function(odh) {
  var polygon = JSON.parse(odh.geometry.geometry_json).coordinates[0];

  // console.log(polygon);

  var gm_polygon = polygon.map(function(ring) {
    return new google.maps.MVCArray(
      ring.map(function(coords){
        return new google.maps.LatLng(coords[1], coords[0]);
      })
    );
  });

  return gm_polygon;
};

var odhDraw = function(id, map) {
  $.get('http://odh.esmc.info/api/v1/odh/'+id, function( data ) {
    var gm_polygon = odhGetGoogleMapsPolygon(data);
    polygonDraw(gm_polygon, map);
  });
};

var odhDrawPage = function(page, map) {
  $.get('http://odh.esmc.info/api/v1/odh?page='+page, function( data ) {
//          console.log(data.data);
    data.data.forEach(function(odh){
      var gm_polygon = odhGetGoogleMapsPolygon(odh);
      polygonDraw(gm_polygon, map);
    });
  });
};

var moveToCoordinate = function(lat, lng){
  var center = new google.maps.LatLng(lat, lng);
  map.panTo(center);
  map.setZoom(14);	
}

var moveToLocation = function(latLng){
  map.panTo(latLng);
  map.setZoom(14);
}

var setBoundsToFitWithGeoposition = function(latLngArr) {
	if(currentGeoposition != null && currentGeoposition !== undefined) {
		latLngArr.push(currentGeoposition)
	}
	setBounds(latLngArr);
}

var setBounds = function(latLngArr) {

		console.log(latLngArr);

    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i < latLngArr.length; i++) {
        bounds.extend(latLngArr[i]);
    }
    map.fitBounds(bounds);
}


var map = initMap();


$(function(){
  
  // for(i=0; i<500; i++) {
  //   odhDrawPage(i, map);
  // }
});