
import User from "../../../models/User"
import connectDB from "../../../middlewares/connectDB";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
    console.log("DONE")
    if (req.method == "POST") {
try{
            const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body)
        let user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
        })
    
        await user.save();
        return res.status(200).json({type: "success", message: "Your account has been created successfully." })
    }
        catch(err) {
            if (err.code === 11000) {
                return res.status(200).json({type: "error", message: "Email already exists. Please use a different email.", errorCode: "EMAIL_EXISTS" })
            }
            return res.status(200).json({type: "error", message: `${err.code}`, errorCode: err.code })
        }
   
    }
    
    else {
        return res.status(200).json({type: "error", message: "ERROR occured while creating your account. Please try again." })
    }
}


export default connectDB(handler); 