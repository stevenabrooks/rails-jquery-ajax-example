$(function() {
	
	//Helper preserves width of cells
	var fixHelper = function(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};

	function success(data) {
		// $.get( '/tasks_display', function(data) {

			console.log(data);

			$('tbody').empty();

			$(data).each(function(i, task) {	
				$('tbody').append('<tr><td data-id="'+task.id+'" class="position">'+task.position+'</td><td>'+task.name+'</td><td>'+task.completed+'</td><td><a href="/tasks/'+task.id+'">show</a></td><td><a href="/tasks/'+task.id+'/edit">edit</a></td><td><a href="/tasks/'+task.id+'" data-confirm="Are you sure?" data-method="delete" rel="nofollow">destroy</a></td></tr>');
			});

		// });
	}

	$("#sort tbody").sortable({
		helper: fixHelper,

		update: function(){ //when we update order update slides array

			var tasks = []; //create an empty slide array 
			//build slide list

			$("#sort tbody tr").each(function(i, slide){
				var task_id = $(this).find('.position').data('id'); //get the task actual id
				tasks.push({task_id: task_id}); //track new position by index in array.
			});

			console.log(tasks);
			// [{"task_id":2},{"task_id":1},{"task_id":3}]

			$.post( '/tasks_sort', {"tasks":tasks}, function(data){success(data)}); //AJAX post the data.

			// {"tasks":[{"task_id":2},{"task_id":1},{"task_id":3}]}
		}

	}).disableSelection();
});