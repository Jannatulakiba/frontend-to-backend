import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'
import cors from 'cors';
const app = express()
const PORT = process.env.PORT || 5000



app.use(cors())
app.use(express.json());



const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB()

app.get('/' , (req , res) => {
        res.send("hellow word from express")
})
app.get('/about' , (req , res) => {
        res.send("hellow word About")

})


const connectMongo = await connectToMongoDB()
const db = connectMongo.db("product-client")
const productCollection = db.collection('users')




app.post("/users", async (req, res) => {
  const data = req.body;
 const result = await productCollection.insertOne(data)
  console.log(result);

  res.send(result);
});
const users = [
  {
    id: 1,
    name: "Akiba",
    email: "akiba@example.com",
    password: "12345678",
    role: "user",
    age: 22,
    isActive: true,
  },
  {
    id: 2,
    name: "Safa",
    email: "safa@example.com",
    password: "12345678",
    role: "user",
    age: 22,
    isActive: true,
  },
];

app.get('/users' , (req , res) => {
        res.send(users)
})

app.listen (PORT , () => {
    console.log(`Server is running ${PORT}`)
})