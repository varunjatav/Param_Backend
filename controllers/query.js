import  Query  from "../models/query.js";

const queryController = async (req,res) => {
    try {
        if(req.body){
            console.log(req.body);
            const query = new Query(req.body);
             await query.save();
            res.status(201).json(req.body);
        }
     } catch (error) {
        console.log("Error Message: " + error);
     }
}

export default queryController;