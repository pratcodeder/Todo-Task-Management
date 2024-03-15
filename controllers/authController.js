const authService = require("../services/authService");

const register = async (req,res) => {
    try { 
        const userData = req.body;
       
        const user = await authService.registerUser(userData);
    
        res.status(201).json({
            message : "user registered successfully",
            userId:user._id,
        });
    } catch (error) {
res.status(500).json({
    message :error.message
});
    }
};

const login = async (req,res) => {
    try {
const userData = req.body;

const {userId, token} = await authService.loginUser(userData);

res.status(200).json({
    message : "User loggedIn successfully",
    token,
    userId
});

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


const someData = async (req, res) => {
    res.send("Hurray, You just accessed a private endpoint");
  };
  
module.exports = {register, login, someData};