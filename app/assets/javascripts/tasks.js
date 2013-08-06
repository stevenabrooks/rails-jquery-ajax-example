$(function() {
	
	//Helper preserves width of cells
	var fixHelper = function(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};

	$("#sort tbody").sortable({
		helper: fixHelper,

		update: function(){ //when we update order update slides array

			var tasks = []; //create an empty slide array 
			//build slide list

			$("#sort tbody tr").each(function(i, slide){
				var task_id = $(this).find('.position').data('id'); //get the task actual id
				tasks.push({task_id: task_id}); //track new position by index in array.
			});

			// tasks = JSON.stringify(tasks); //format to JSON.

			console.log(tasks); //make sure we have client-side data in the correct format.
			// {"tasks":[{"object_id":2},{"object_id":1},{"object_id":3}]}
			
			$.post( '/tasks_sort', {"tasks":tasks} ); //AJAX post the data.
		}

	}).disableSelection();
});