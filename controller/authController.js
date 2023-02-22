const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const signingToken = id => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn : process.env.EXPIRES
    })
}

exports.signup = async(req, res) => {

    try {
            const data = req.body;
            const { email, password, name, dob } = data;
            if (!email) {
              return res.status(400).json({
                status: false,
                message: "Email Field is not present",
              });
            }
            if (!password) {
              return res.status(400).json({
                status: false,
                message: "Password is mandatory field",
              });
            }
            if (!name) {
              return res.status(400).json({
                status: false,
                message: "Name Field is not present",
              });
            }
            if (!dob) {
              return res.status(400).json({
                status: false,
                message: "dob Field is not present",
              });
            }
            const createUserdata = await UserModel.create(data);
            if (createUserdata) {
                const token = signingToken(createUserdata._id);
                return res.status(201).json({
                    status:true,
                    token
                })
            }
          } catch (error) {
            res.status(500).send({
              status: false,
              message: error,
            });
          }
}



exports.loging = async(req, res) => {
    // if email and password is not present 
    const data = req.body;
    const {email, password} = data;
    if(!email || !password) {
        res.status(400).send({
            status:false,
            message: "Please provide email and password"
        })
    }

    // if user exsits or not and password it is correct or not
    const user = await UserModel.findOne({email}).select('+password');
    if(!user || !(password == UserModel.password)) {
        return res.status(401).send({
            status: false,
            message: "InCorrect Email and Password"
        })
    }
    // if everything is ok then we just pass the token to the client
    const token = signingToken(user.id);
    return res.status(200).send({
        status: true,
        token
    })
}

exports.protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return res.status(400).send({
            status: false,
            message: "You are not loggedIn ! Please log in to get access"
        })
    }
    // verification 
    let decoded = await jwt.verify(token, process.env.SECRET_KEY); 
    console.log(typeof decoded);  

    // Check if user still exists or not
    const freshUSer = await UserModel.findOne({id : decoded._id});

    if(!freshUSer) {
        return res.status(400).send({
            status: false,
            message: "token that belonging to this user does no longer exist"
        })
    }

    next();
}