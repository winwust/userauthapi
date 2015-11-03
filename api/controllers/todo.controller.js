var Todo = require('../models/todo.model');

var list = function(req, res) {
    var creator = req.account.email;
    Todo.find({creator: creator}, function(err, todos) {
        if (err) {
            res.json({error: err.message});
        } else {
            res.json(todos);
        }
    });
};
 
var create = function(req, res) {
    var item = new Todo();
    item.text = req.body.text;
    item.creator = req.account.email;

    item.save(function(err) {
        if (err) {
            res.json({error: err.message});
        } else {
            res.json(item);
        }
    })
};

var del = function(req, res) {
    Todo.findById(req.params.todo_id, function(finderr, item) {
        if (finderr) {
            res.json({error: finderr.message})
        } else {
            if (item !== null) {
                if (item.creator === req.account.email) {
                    item.remove(function(delerr) {
                        if (delerr) {
                            res.json({error: delerr.message});
                        } else {
                            res.json({confirmation: 'succeed'});
                        }
                    });
                } else {
                    res.json({error: 'cannot delete the todo item since you are not the creator'})
                }
            } else {
                res.json({error: 'todo item not found'});
            }
        }
    });
};

module.exports = {
    list: list,
    create: create,
    del: del
};