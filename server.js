const express = require('express');
const db_connection = require("./config/db_connection");

//models
const M_User = require("./models/user");

const app = express();

const {PORT, HOST, HOSTNAME} = require("./config/constants");

app.use(express.urlencoded({extended: true}));
app.use(express.json());


async function add_friend(req, res){
    try{
        const {friendRequests: idUserRequest, friendTarget: idUserTarget} = req.body;
        if(!idUserRequest || !idUserTarget) throw new Error("Wrong params!");
        const user = await M_User.findById(idUserRequest);
        if(!user) throw new Error("User does not exist!");
        await user.pendingFriends.push(idUserRequest);
        res.status(200).json({ success: true });
        await user.save();
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}   

async function get_friends(req, res){
    try{
        const {friendRequests: idUserRequest, flag: requestFlag, pendingFriends} = req.body;
        if(!idUserRequest) throw new Error("Wrong params!");
        const user = await User.findById(idUserRequest);
        let friends = await User.find({_id: { $in: user.friends } });
        if(!requestFlag || friends.length > 0) throw new Error("Пользователь отклонил ваш запрос в друзья!");
        friends = friends.map(obj => obj.name);
        user.friends = pendingFriends;
        user.pendingFriends = user.pendingFriends.pop();
        const new_user = await M_User.findById(friends[0]);
        new_user.friends = idUserRequest;
        new_user.pendingFriends = req.body.pendingFriends.pop();
        await user.save();
        await new_user.save();
        res.json(new_user);
    }
    catch(err){
       console.log(err);
       res.status(400).send(err.message);
    }
}

function home(req, res){
    try{
        const users = await M_User.find();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}

function get_user_info(req, res){
    try{
        const id = req.params.userId;
        const user = await M_User.findById(id);
        res.json(user);
    }
    catch(err){
       console.log(err);
       res.status(400).send(err.message);
    }

}

function create_user(req, res){
    try{
        let test1 = await testCreate();
        console.log(test1);
        const {balance, picture, age, name, gender, company, email, friends, pendingFriends} = req.body;
        const new_user = new M_User(balance, picture, age, name, gender, company, email, friends, pendingFriends);
        await new_user.save();
        let test2 = await testCreate();
        if (test1 < test2) {
            console.log("test correct");
        }
        else {
            console.log("test error");
        }
    }
    catch(err){
       console.log(err);
       res.status(400).send(err.message);
    }
}


function update_user_info(req, res){
    try{
        const id = req.params.userId;
        const {balance, picture, age, name, gender, company, email, friends, pendingFriends} = req.body;
        const updated_user = await M_User.findById(id);
        Object.assign(user, {balance, picture, age, name, gender, company, email, friends, pendingFriends});
        await updated_user.save();
        res.status(200).json(updated_user);
    }
    catch(err){
       console.log(err);
       res.status(400).send(err.message);
    }

}

function delete_user(req, res){
    try{
        const id = req.params.userId;
        const user = await M_User.findById(id);
        const deleted_user = await user.remove();
        res.status(200).json(deleted_user);
    }
    catch(err){
       console.log(err);
       res.status(400).send(err.message);
    }

}


app.get("/", home);
app.post("/addFriend", add_friend);
app.post("/getFriends", get_friends);
app.get('/:userId', get_user_info);
app.post('/', create_user);
app.put('/:userId', update_user_info);
app.delete('/:userId', delete_user);


app.listen(PORT, HOST, function () {
    console.log(`Server listens ${HOSTNAME}`)
});



async function testCreate() {
    return await M_User.find({}).countDocuments();
}

function testRead() {

}
function testUpdate() {

}
function testDelete() {

}