const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    targetUser = await db.user.findAll();
    res.status(200).send(targetUser);
};

const registerUser = async (req, res) => {
    const {username, password, email, status, address} = req.body;
    const targetUser = await db.user.findOne({
        where: {
            username: username
        }
    });
    if(targetUser){
        res.status(400).send({ message: " Username already taken" });
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        await db.user.create({
            username: username,
            password: hashedPassword,
            email: email,
            status: status,
            address: address
         });
         res.status(201).send({message: 'register user success'});
    }
    
};

const loginUser = async (req, res) => {
    
    const { username, password } = req.body;
    const targetUser = await db.user.findOne({ where : { username: username }});
    if(!targetUser){
        res.status(400).send({ message: "username or password is wrong"});
    } else {

        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password);
        if(isCorrectPassword){
            const payload = {
                id: targetUser.id,
                address: targetUser.address,
                email: targetUser.email,
                status: targetUser.status
            };
            const token = jwt.sign(payload, process.env.SECRETOFKEY, { expiresIn: 3600 });
            if(targetUser.status == '0'){

                await targetUser.update({
                    status: '1'
                });
                const datas = {
                    code: 0,
                    data: payload,
                    token: token,
                    message:"login seccessful"
                };
    
                await res.status(200);
                await res.json(datas);
            } else {
                await targetUser.update({
                    status: '0'
                });
                const datas = {
                    code: 2,
                    token: token,
                    message:"User is already login",
                };
    
                res.status(200);
                res.json(datas);
            }

        } else {
            res.status(400).send({ message: "username or password is wrong"});
        }
    }

};

const logoutUser = async (req, res) => {
    const { username } = req.body;
    console.log(req.body);
    const targetUser = await db.user.findOne({ where : { username: username }});
    if(!targetUser){
        res.status(400).send({ message: "username is wrong"});
    } else {
            if(targetUser.status == '1'){
                await targetUser.update({
                    status: '0'
                });
                const datas = {
                    code: 0,
                    message:"logout seccessful"
                };
                await res.status(200);
                await res.json(datas);
            } else {
                const datas = {
                    code: 0,
                    message:"logout seccessful"
                };
                await res.status(200);
                await res.json(datas);
            }
        }
};



module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    getUser
};