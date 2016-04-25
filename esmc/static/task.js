$(function(){
	var activeTaskId = null;

	var checkActiveTask = function() {

		if(activeTaskId == null) {
			updateDOMforFetching()
		}

		$.get('/ajax', function( data ) {
			data = data.slice(-1)[0];
      updateDOMforTaskContainer(data.pk, data.fields);
    })
    .fail(function() {
    	updateDOMforError()
    	console.log('shit')
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
			$('#newTaskModal').modal();
			$('#taskNotask').hide();
			$('#taskActive').show();
			activeTaskId = taskId;
			updateDOMforActiveTask(data)
		}
		$('#taskFetchError').hide();
		$('#taskFetching').hide();
	}

	var updateDOMforActiveTask = function(data) {
		$('#taskRouteName').text(data);
		$('#taskTime').text(data);
		$('#taskTechOp').text(data);
		$('#taskOdhList');
		$('#taskComment').text(data);
		$('#taskRouteName').text(data);
	}

	setTimeout(function() {
		checkActiveTask();
	}, 2000);

	$('#taskCompletedButton').on('click', function(e) {
		$.post('', data, function( data ) {
      
    });
	})
});