const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.05osm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const todoList = client.db('todo_list').collection('list');
        
        app.post('/todolist' , async(req , res ) =>{
            const doctor = req.body;
            const result = await todoList.insertOne(doctor);
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From TODO _list')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

