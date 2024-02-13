const cookie = require('cookies');
const User = require('../models/userModel');
const Task = require('../models/taskModel')

const defaultPath = async (req, res) => {
    const login = req.cookies;
    console.log("llll", login);

    if (login.u_id) {
        res.render('dashboard')
    }
    else {
        res.redirect('/sign-in')
    }
}
const table = async (req, res) => {
    try {
        let {u_id} = req.cookies
        console.log("its my uid" , u_id);

        let data = await Task.find();
        let taskdata = data.filter((t) => { 
            return  t.u_id == u_id
          })
        console.log("its our my data log" , data);
        console.log("its our my data log" , taskdata);

        if(data != null){
              res.render('tables', {taskdata});
        }
       else{
           res.send('fegdfghfdegdf');
       } 
    }
    catch (err) {
        console.log("table err", err);
    }
}   
const billing = (req, res) => {
    res.render('billing')
}
const virtual = async (req, res) => {
    res.render('virtual-reality')
}
const rtl = (req, res) => {
    res.render('rtl')
}
const notification = (req, res) => {
    res.render('notifications')
}
const profile = (req, res) => {
    res.render('profile')
}
const signin = (req, res) => {
    res.render('sign-in')
}
const signup = (req, res) => {
    res.render('sign-up')
}
const register = async (req, res) => {
    const { name, gmail, pass } = req.body;

    try {
        const newRegister = await new User({
            name,
            gmail,
            pass
        })
        newRegister.save();
        res.render('sign-in')
    }
    catch (err) {
        console.log("register err =>", err);
    }
}
const usersignin = async (req, res) => {
    try {
        const usersign = await User.find();
        var users = usersign.filter((user) => {
            return user.gmail == req.body.gmail;
        });
        if (users.length == 0) {
            console.log("user created....");
        }
        else {
            if (users[0].pass == req.body.pass) {
                u_id = users[0].id;
                let myCookie = {
                    httpOnly: true
                }
                console.log("u_id =>", u_id);
                res.cookie('u_id', users[0].id, myCookie)
                res.render('dashboard');
                console.log("passward is match");
            }
            else {
                res.redirect('back')
                console.log("passward is not match");
            }
        }
    }
    catch (err) {
        console.log("usersign", err);
    }


}

const addtask = async (req, res) => {
    const { tname, tdis, tstatues, tdate } = req.body;
    const { u_id } = req.cookies;

    const newTask = await new Task({
        tname,
        tdis,
        tstatues,
        tdate,
        u_id
    })
    newTask.save();
    res.redirect('virtual-reality')


}
const 
viewdata = async (req, res) => {
    let view = req.params.id;
    let tdata = await Task.findById(view);
    console.log("its our view data", tdata);
    res.render('viewdata', { tdata })
}
const editdata = async (req, res) => {
    const { id } = req.params;
    const edit = await Task.findById(id);
    res.render('editdata', { edit });
}
const update = async (req, res) => {
    const { id, tname, tdis, tstatues, tdate } = req.body;
    console.log("req.body", req.body.id);

    const update = await Task.findByIdAndUpdate(id, { tname, tdis, tstatues, tdate });
    console.log("updated", update);
    res.render('dashboard')
}

const deletedata = async (req, res) => {
    let { id } = req.params;

    let deldata = await Task.findByIdAndDelete(id);
    res.redirect('/tables');
}
let logOut = (req , res) => {
    
    res.clearCookie('u_id')
    res.redirect('/')
}

module.exports = { defaultPath, table, billing, virtual, rtl, notification, profile, signin, signup, register, usersignin, addtask, viewdata, editdata, update, deletedata, logOut }