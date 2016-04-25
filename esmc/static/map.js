$(function(){
  function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: {lat: 55.7558, lng: 37.6173}
		});
		return map;
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

//        console.log(gm_polygon);
  };

  var odhGetGoogleMapsPolygon = function(odh) {
    var polygon = JSON.parse(odh.geometry.geometry_json).coordinates[0];

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

  var map = initMap();
  // for(i=0; i<500; i++) {
  //   odhDrawPage(i, map);
  // }
});