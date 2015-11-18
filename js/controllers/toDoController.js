'use strict'

/* Controllers */

app.controller('toDoController',['$scope', '$firebaseArray',function($scope, $firebaseArray) {
	var url = 'https://todolist-krl.firebaseio.com/';
	var tasksRef = new Firebase(url);
	
	// bind this arry to the Firebase reference
	$scope.tasks = $firebaseArray(tasksRef);
		
	$scope.todo = {
		task: '',
		done: false,
		goodjob: ''
	};
	
	$scope.saveTask = function() {
		$scope.tasks.$add($scope.todo);
		$scope.todo = {task: '', done: false, goodjob: ''};
	};
	
	// Code for done?
	$scope.saveDone = function(doneTask) {
		if(doneTask.done === true) {
			doneTask.goodjob = 'Good Job!';
		}
		else {doneTask.goodjob = '';}
		$scope.tasks.$save(doneTask);
		
	};
	/* Per https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html,
		suggestions on querying a database and ordering by timestamp:
		 // create a query for the most recent 25 messages on the server
		var query = messagesRef.orderByChild("timestamp").limitToLast(25);
		// the $firebaseArray service properly handles database queries as well
		$scope.filteredMessages = $firebaseArray(query);
	*/
}]);