$(document).ready(function() {
  //creates list array to hold all task items
  var listo = [];


  //hides form on page load
  $('#newTaskForm').hide();

  //constructor function to streamline object creating process
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
}

  //creates an object and pushes to array whenever user enters something into input field
  var addTask = function(task) {
  	if(task) {
  		task = new Task(task);
        listo.push(task);
  	$('#newItemInput').val('');
        $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' +
         task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

   			 }
         //hides 'new' button when form is visible
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');

	}


  //calls the addTask function when user clicks the saveNewItem button
   $('#saveNewItem').on('click', function(e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
    }); 
//Opens form
  $('#newListItem').on('click', function() {
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });

  //closes form
  $('#cancel').on('clock', function(e) {
    e.preventDefault();
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });

var advanceTask = function(task) {
  var modified = task.innerText.trim(); 
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
}

//moves item to inProgress
$(document).on('click', '#item', function(e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});


//moves item to archived
$(document).on('click', '#inProgress', function(e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});


//deletes item on
$(document).on('click', '#archived', function(e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});



});