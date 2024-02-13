const express = require('express');
const route = express();
const control = require('../controllers/controller')

route.get('/',control.defaultPath);
route.get('/tables',control.table);
route.get('/billing',control.billing);
route.get('/virtual-reality',control.virtual);
route.get('/rtl',control.rtl);
route.get('/notifications',control.notification);
route.get('/profile',control.profile);
route.get('/sign-in',control.signin);
route.get('/sign-up',control.signup);
route.get('/logOut',control.logOut)

route.get('/viewdata/:id',control.viewdata);
route.get('/editdata/:id',control.editdata);
route.get('/deletedata/:id',control.deletedata);

route.post('/register',control.register);
route.post('/usersignin',control.usersignin);
route.post('/addtask',control.addtask);
route.post('/update',control.update);

module.exports = route;