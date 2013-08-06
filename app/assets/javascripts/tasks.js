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

			$("#sort tbody tr").each(function(i, slide){
				var task_id = $(this).find('.position').data('id'); //get the task actual id
				tasks.push({task_id: task_id}); //track new position by index in array.
			});

			//console.log(tasks);
			// [{"task_id":2},{"task_id":1},{"task_id":3}]

			$.post( '/tasks_sort', {"tasks":tasks}, function(tasks){

				$('tbody').empty(); //clear out table rows from tbody

				$(tasks).each(function(i, task) {	//append each row back in the updated position order.
					$('tbody').append('<tr><td data-id="'+task.id+'" class="position">'+task.position+'</td><td>'+task.name+'</td><td>'+task.completed+'</td><td><a href="/tasks/'+task.id+'">show</a></td><td><a href="/tasks/'+task.id+'/edit">edit</a></td><td><a href="/tasks/'+task.id+'" data-confirm="Are you sure?" data-method="delete" rel="nofollow">destroy</a></td></tr>');
				});
			}); //AJAX post the data.

		}

	}).disableSelection();
});