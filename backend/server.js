const express = require("express");
const dotenv = require("dotenv");
const data = require("./data/notes");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
// const userRouter = require("./routes/userRoutes");
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes");
const twofaRouter = require("./routes/2faRoutes");  
// const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const errorMiddleware = require("./Middlewares/errorMiddleware");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());


const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);  



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/2fa", twofaRouter);

app.get("/api/notes", (req, res) => {
    res.json(data);
    }
)
app.get("/api/notes/:id", (req, res) => {
  res.json(data.find((n) => n._id === req.params.id)    );
});
app.use(errorMiddleware)

app.listen(PORT, console.log(`server is running on port ${PORT}`));
