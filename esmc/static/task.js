$(function(){
	var activeTask = null;

	var checkActiveTask = function() {

		if(activeTask == null) {
			updateDOMforFetching()
		}

		$.get('', function( data ) {
      updateDOMforTaskContainer(data)
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

	var updateDOMforTaskContainer = function(taskId) {
		if(taskId == null) {
			$('#taskNotask').show();
			$('#taskActive').hide();
		}
		else {
			$('#taskNotask').hide();
			$('#taskActive').show();
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