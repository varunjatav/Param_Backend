import { sendQueryMail, sendQueryMailUs } from "../mail.js";
import  Query  from "../models/query.js";

const queryController = async (req,res) => {
    try {
        if(req.body){
            const { name, email, phoneNo, message } = req.body;
            if (!name ||!email || !phoneNo || !message) {
                return res.status(400).json({ message: "Some Fields are Empty!!" });
              }
            console.log(req.body);
            const query = new Query(req.body);
             await query.save();
             await sendQueryMail(req.body);
             await sendQueryMailUs(req.body);
            res.status(201).json(req.body);
        }
     } catch (error) {
        console.log("Error Message: " + error);
     }
}

export default queryController;