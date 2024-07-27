const express = require('express')
const {getDishes} = require('./Controllers/dishesController')
const dishesrouter = require('./routes/dishesRoutes')
const userRouter = require('./routes/userRoutes')

const mongoose = require('mongoose'); // we importing the MongoDb in code


const app = express()
const port = 5000

const cors = require("cors"); // Impoting the cors here

app.use(cors()); // we are using it to connect frontend to backend

app.use(express.json())


mongoose.connect('mongodb+srv://tarunjoshier:tEBd7PjFy4EK4FVs@cluster0.fll3pnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0mongodb://127.0.0.1:27017/foodDelivery')
  .then(() => console.log('Connected!')); // code of mongoose to connect it with DB

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post("/api/user/register", (req,res) => {  //api bnayi hai hmne user kii
//     console.log(req.body);
//     res.send("Post Success")
// })

// app.post("/api/user/login", (req,res) => {  // api code me bnayi hai hmne ye login ki
//     console.log(req.body);
//     res.send("Post Success")
// })

// In middleware we can put the validation
app.use((req, res, next) => { // next we used here to move forward the remaining below code
  console.log("Time:", Date.now());  // Middleware we have used in this syntax to see the time and date whenever we call any API in project
  next();
})

app.use("/api", dishesrouter)

app.use("/api", userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})