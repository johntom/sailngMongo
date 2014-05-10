angular.module( 'sailng.todos', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'todos', {
		url: '/todos',
		views: {
			"main": {
				controller: 'TodoCtrl',
				templateUrl: 'todos/index.tpl.html'
			}
		},
		data:{ pageTitle: 'Todo' }
	});
})

    //.controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config,titleService, TodoModel,$filter, ngTableParams  ) {
//
//    //    titleService.setTitle('Messages');
//    $scope.newTodo = {};
//	$scope.todos = [];
//	$scope.currentUser = config.currentUser;

    .controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config, titleService, TodoModel,$filter, ngTableParams ) {

        $scope.newTodo = {};

        $scope.todos = [];
        $scope.currentUser = config.currentUser;
        //console.log('scope.currentUser.data:: ', $scope.currentUser)
        // old version $sails.on('message', function (envelope) {
        // see  assets/src/common/models/Todo.js
        $sails.on('todo', function (envelope) {

            switch(envelope.verb) {
                case 'created':
                    $scope.todos.unshift(envelope.data);
                   // console.log('envelope.data:: ',envelope.data.comoboday, envelope.data)
                    $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();

                    break;
                case 'destroyed':
                    lodash.remove($scope.todos, {id: envelope.id});
                    $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();
                    break;
                case 'updated': //
                       console.log('in MessagesCtrl updated ',envelope.status,envelope.id,envelope)
//                    for (var i in $scope.todos) {
//                        if ($scope.todos[i].id == envelope.id) {
//                            $scope.todos[i].status = envelope.data.status;
//                        }
//                    }
                    $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();
                    break;
            }
        });

//        $scope.destroyMessage = function(message) {
//            // check here if this message belongs to the currentUser
//            //ng-show="currentUser.id === message.user.id || currentUser.role==='4'"><i class="fa fa-trash-o"></i></button>
//            if (todos.user.id === config.currentUser.id || config.currentUser.role === '4') {
//                Todo.delete(message).then(function(model) {
//                    // message has been deleted, and removed from $scope.messages
//                });
//            }
//        };

        $scope.destroyTodo = function(todo) {
            TodoModel.delete(todo).then(function(model) {
                // todo has been deleted, and removed from $scope.todos
             //   lodash.remove($scope.todos, {id: todo.id});
            });
        };

        $scope.createTodo = function(newTodo) {
            console.log('new ',newTodo)
            newTodo.user = config.currentUser.id;

            TodoModel.create(newTodo).then(function(model) {
                $scope.newTodo.title ='';
                //= {};
            });
        };

        // var   messPromise =  MessageModel.getAll($scope);
        // messPromise.then(function (models) {

        TodoModel.getAll($scope).then(function(models) {
            $scope.todos = models.data;
            var data =$scope.todos;
            console.log('data ',data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {
                    //  comboday: 'asc'     // initial sorting
                    title: 'asc'
                }
            }, {
                 total: data.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

    });

//
//.controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config,titleService, TodoModel,$filter, ngTableParams  ) {
//
//    //    titleService.setTitle('Messages');
//    $scope.newTodo = {};
//	$scope.todos = [];
//	$scope.currentUser = config.currentUser;
//    console.log('$scope.currentUser ',$scope.currentUser)
//
//        //alert(envelope.verb)
//        console.log('TodoCtrl envelope.verb'  ,  envelope.verb)
//		switch(envelope.verb) {
//			case 'created':
//				$scope.todos.unshift(envelope.data);
//				break;
//			case 'destroyed':
//				lodash.remove($scope.todos, {id: envelope.id});
//				break;
//		}
//	});
//
//	$scope.destroyTodo = function(todo) {
//		TodoModel.delete(todo).then(function(model) {
//			// todo has been deleted, and removed from $scope.todos
//		});
//	};
//
//	$scope.createTodo = function(newTodo) {
//        console.log('new ',newTodo)
//        newTodo.user = config.currentUser.id;
//
//        TodoModel.create(newTodo).then(function(model) {
//			$scope.newTodo = {};
//		});
//	};
//        TodoModel.getAll($scope).then(function(models) {
//            console.log('models '  ,  models)
//            $scope.todos = models.data;
//            var data =$scope.todos;
//            console.log('data ',data)
//            $scope.tableParams = new ngTableParams({
//                page: 1,            // show first page
//                count: 25,          // count per page
//                sorting: {
//                    //  comboday: 'asc'     // initial sorting
//                    title: 'asc',
//                    isComplete:'asc'
//                }
//                }, {
//               // groupBy: 'comboday',
//                total: data.length,
//                getData: function($defer, params) {
//                    //                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                    //                }
//                    var orderedData = params.sorting() ?
//                        $filter('orderBy')(data, params.orderBy()) :
//                        data;
//
//                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                }
//        });
//
//});
//
