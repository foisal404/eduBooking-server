const express = require('express');
const cors = require('cors');
const app=express();
const port=process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//midlleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('eduBooking is running....')
  })


  const uri = `mongodb+srv://${process.env.User}:${process.env.Pass}@cluster0.pxrxjz6.mongodb.net/?retryWrites=true&w=majority`;
  
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      // collections
      const colleges = client.db("eduBooking").collection("Colleges");

      //APIs
      //colleges APi
      app.get('/colleges/:id',async(req,res)=>{
        const id=req.params.id;
        const query = { _id: new ObjectId(id) };
        const cursor =await colleges.findOne(query)
        res.send(cursor)
      })
      app.get('/colleges',async(req,res)=>{
        const cursor =await colleges.find().toArray();
        res.send(cursor)
      })


      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);
  


  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })