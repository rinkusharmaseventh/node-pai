const express =  require("express");
const router = express.Router();
const users = require("../models/userSchema");
//router.get("/",(req,res)=>{
 //   console.log("connect");
//});
//register user
router.post("/register", async(req,res)=>{
   console.log(req.body);
    const {name,email,age,mobile,work,add,desc} = req.body;
    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).send("plz fill the data");
    }
    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser);
        if(preuser){
            const json = '{"result":"user already exist", "count":null}';
            res.status(422).send(JSON.parse(json));
        }else{
            const aduser = new users({
                name,email,age,mobile,work,add,desc
            });
            await aduser.save();
            res.status(201).json(aduser);
            console.log(aduser);
        }
    } catch (error) {
        res.status(422).send(error);
    }
});

//get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        console.log(userdata);
        res.status(201).json(userdata);
    } catch (error) {
        res.status(404).json(error);
    }
})

//get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;
        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    } catch (error) {
        res.status(404).json(userindividual);
    }
})


//update userdata

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
       // console.log("gautamm");
        //console.log({id});
        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error);
    }
});


//delete user

router.delete("/deleteuser/:id", async(req,res)=>{

    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;