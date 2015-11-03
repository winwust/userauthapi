module.exports = function(router) {
    var todoCtrl = require('../controllers/todo.controller');
 
    router.route('/todo-items')
        .get(todoCtrl.list)
        .post(todoCtrl.create);
    router.route('/todo-items/:todo_id')
        .delete(todoCtrl.del);
};