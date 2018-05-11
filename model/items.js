var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "flowgrammer",
    password: "qwer1234",
    database: "remember_it"
});

conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
});

var contents = {
    find: function (userEmail, done) {
        conn.query('select * from items where user_email = ? ORDER BY created DESC', [userEmail], function (err, result) {
            if (err) {
                console.log(err);
                //req.flash({'error':err.message});
                done(err);
            } else {
                //console.log(result);
                done(err, result);
            }
        });
    },
    findByPage: function (userEmail, start, limit, done) {
        conn.query('select * from items where user_email = ? ORDER BY created DESC LIMIT ?, ?', [userEmail, start, limit], function (err, result) {
            if (err) {
                console.log(err);
                //req.flash({'error':err.message});
                done(err);
            } else {
                done(err, result);
            }
        });
    },
    findByPageAndState: function (userEmail, start, limit, state, sort, done) {
        if (state == 1) {
            var queryString = 'select * from items where user_email = ? and remember_state = ? ORDER BY created DESC LIMIT ?, ?';
            if (sort == 0) {
                queryString = 'select * from items where user_email = ? and remember_state = ? ORDER BY created ASC LIMIT ?, ?';
            }

            conn.query(queryString, [userEmail, state, start, limit], function (err, result) {
                if (err) {
                    console.log(err);
                    //req.flash({'error':err.message});
                    done(err);
                } else {
                    done(err, result);
                }
            });
        }
        else {
            var queryString = 'select * from items where user_email = ? and remember_state = ? ORDER BY remembered DESC LIMIT ?, ?';
            if (sort == 0) {
                queryString = 'select * from items where user_email = ? and remember_state = ? ORDER BY remembered ASC LIMIT ?, ?';
            }

            conn.query(queryString, [userEmail, state, start, limit], function (err, result) {
                if (err) {
                    console.log(err);
                    //req.flash({'error':err.message});
                    done(err);
                } else {
                    done(err, result);
                }
            });
        }
    },
    findItemsWithState: function (userEmail, done) {
        conn.query('select remember_state from items where user_email = ?', [userEmail], function (err, result) {
            if (err) {
                console.log(err);
                //req.flash({'error':err.message});
                done(err);
            } else {
                done(err, result);
            }
        });
    },
    create: function (newItem, done) {
        conn.query('insert into items set ?', newItem, function (err, result) {
            if (err) {
                console.log(err);
                done(err);
            } else {
                console.log(result);
                done(null);
            }
        });

    },
    findById: function (item, done) {
        conn.query('select * from items where id = ?', [item], function (err, result) {
            if (err) {
                console.log(err);
                done(err);
            } else {
                if (result.length > 0) {
                    console.log(result);
                    done(null, result[0]);
                } else {
                    done(null);
                }

            }

        });
    },
    findByIdAndUpdate: function (itemId, updatedItem, done) {
        conn.query('UPDATE items SET item = ?, item_desc = ?, remember_state = ? WHERE id = ?',
            [updatedItem.item, updatedItem.item_desc, updatedItem.remember_state, itemId], function (err, results) {
                if (err) {
                    console.log(err);
                    done(err);
                } else {

                    console.log(">>>>>>>>>>>>>>>>>>>> " + results.constructor);
                    done(null, results);
                }
            });
    },
    findByIdAndRemove: function (itemId, done) {
        conn.query('DELETE from items where id = ?', [itemId], function (err, result) {
            if (err) {
                console.log(err);
                done(err);
            } else {
                done(null);
            }
        });
    },
    findByStateAndRemove: function (userEmail, state, done) {
        if (state == 0) {
            conn.query('DELETE from items where user_email = ?', [userEmail, state], function (err, result) {
                if (err) {
                    console.log(err);
                    done(err);
                } else {
                    done(null);
                }
            });
        } else {
            conn.query('DELETE from items where user_email = ? and remember_state = ?', [userEmail, state], function (err, result) {
                if (err) {
                    console.log(err);
                    done(err);
                } else {
                    done(null);
                }
            });
        }
    },

    findByIdAndUpdateState: function (itemId, state, done) {
        var now = new Date();
        // console.log('now : ' + now + ', state : ' + state);
        conn.query('UPDATE items SET remember_state = ?, remembered = ? WHERE id = ?',
            [state, now, itemId], function (err, results) {
                if (err) {
                    console.log(err);
                    done(err);
                } else {
                    console.log(">>>>>>>>>>>>>>>>>>>> " + results.constructor);
                    done(null, results);
                }
            });
    },

    findByIdAndUpdateStateAndForgetCount: function (itemId, state, forgetCount, done) {
        var now = new Date();
        // console.log('now : ' + now + ', state : ' + state);
        conn.query('UPDATE items SET remember_state = ?, forget_count = ?, created = ?, remembered = ? WHERE id = ?',
            [state, forgetCount, now, now, itemId], function (err, results) {
                if (err) {
                    console.log(err);
                    done(err);
                } else {
                    console.log(">>>>>>>>>>>>>>>>>>>> " + results.constructor);
                    done(null, results);
                }
            });
    }


};

module.exports = contents;

