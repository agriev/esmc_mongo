var startup = true
var activeTaskId = null;

var checkActiveTask = function() {

	// console.log(activeTaskId);

	if(startup === true) {
		updateDOMforFetching()
	}

	$.get('/ajax/', function( data ) {
		startup = false

		if(data.length == 0) {
			updateDOMforTaskContainer(null, null);
			return;
		}

		data = data.slice(-1)[0];
    updateDOMforTaskContainer(data.pk, data.fields);
    // console.log(data.fields)
  })
  .fail(function() {
  	updateDOMforError()
	});
};

var updateDOMforFetching = function() {
	$('#taskNotask').hide();
	$('#taskActive').hide();
	$('#taskFetchError').hide();
	$('#taskFetching').show();
}

var updateDOMforError = function() {
	$('#taskNotask').hide();
	$('#taskActive').hide();
	$('#taskFetchError').show();
	$('#taskFetching').hide();
}

var updateDOMforTaskContainer = function(taskId, data) {
	if(taskId == null) {
		$('#taskNotask').show();
		$('#taskActive').hide();
	}
	else if(taskId != activeTaskId) {
		if(data.status == 'new') {
			$('#newTaskModal').modal();
		}
		$('#taskNotask').hide();
		$('#taskActive').show();
		activeTaskId = taskId;
		updateDOMforActiveTask(data)
	}
	$('#taskFetchError').hide();
	$('#taskFetching').hide();
}

var getOdh = function(id, move) {
	$.get('http://odh.esmc.info/api/v1/odh/'+id, function( data ) {
		// console.log(data);
		$('#taskOdhList').append('<li>'+data.name+'</li>');

    var gm_polygon = odhGetGoogleMapsPolygon(data);
    polygonDraw(gm_polygon, map);

    if(move == true) {
    	// console.log(odhGetFirstCoordinate(data))
    	// moveToLocation(odhGetFirstCoordinate(data))

    	setBoundsToFitWithGeoposition([odhGetFirstCoordinate(data)]);
    }
  });
}

var updateDOMforActiveTask = function(data) {
	$('#taskRouteName, #newTaskRouteName').text(data.route[0]);
	moment().locale('ru');
	var dateStart = moment(new Date(data.dateStart));
	var dateFinish = moment(new Date(data.dateFinish));
	var dateString = dateStart.locale('ru').format('DD.MM hh:mm') + " — " + dateFinish.locale('ru').format('hh:mm');
	$('#taskDate, #newTaskDate').text(dateString);
	$('#taskTechOp, #newTaskTechOp').text(data.techOp);
	$('#taskOdhList').empty()
	var odhIds = data.route[1].split(",");
	if(odhIds.length > 0) {
		odhIds.forEach(function(odhId, i) {
			getOdh(odhId, i==0)
		});
	}
	$('#taskOdhList');
	$('#taskComment, #newTaskComment').text(data.comment);
}

var changeStatus = function(id, status) {
  console.log(status);
	$.post('/set_status/', { 'id': id, 'status': status }, function( data ) {
    // console.log(data);
    // $('#newTaskModal').modal('hide');
    if(status == 'completed') {
    	activeTaskId = null;
    }
    checkActiveTask();
  });
}

var updateMapHeight = function() {
	var height = Math.max($(document).height(), $(window).height()) - $('#navbar').height();
	$('#map').height(height);
	$('#taskActive').height(height);
}


$(function(){

	setInterval(function() {
		checkActiveTask();
	}, 5000);

	$('#taskCompletedButton').on('click', function(e) {
		// console.log('comp');
		if(activeTaskId == null) return;
		changeStatus(activeTaskId, 'completed');
	});

	$(window).on('resize', function(){
    updateMapHeight()
  }).trigger('resize');
	

	// $('#newTaskAcceptButton').on('click', function(e) {
	// 	// console.log('acc');
	// 	if(activeTaskId == null) return;
	// 	changeStatus(activeTaskId, 'accepted');
	// });

	$('#newTaskModal').on('hide.bs.modal', function (e) {
  	changeStatus(activeTaskId, 'accepted');
	})

});