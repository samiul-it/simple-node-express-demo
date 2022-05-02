const express = require("express");
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
const app=express();
const port=process.env.PORT || 5000;

//middleware

app.use(cors()); //To connect between Ports as like 3000 with 5000
app.use(express.json());

//mongoDB credentials
//name: testdb1
//password: ojYKzCrXjfyylslw


const uri =
  "mongodb+srv://testdb1:ojYKzCrXjfyylslw@cluster0.tpxgr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        await client.connect();
        const usercollection = client.db("test").collection("devices");
        // const userCollection=client.db("Food Express").collection("user");
        const user={
            name:"Tumpa Jahan",
            email:"tj@programming-hero.com"
        };
        const result = await usercollection.insertOne(user);
        console.log(`User Created ID ${result.insertedId}`);


    }
    finally{
        //await client.close();
    }

}

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("Welcome to Our Server");
});

app.listen(port,()=>{
    console.log("CRUD Server Started:PORTNO.",port);
})

