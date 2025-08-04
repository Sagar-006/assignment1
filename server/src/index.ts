import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
// import postRoute from "./routes/postRoute";
import connectDB from "./db/db";


const app = express();


app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;


// Routes
app.use("/api/user", userRoute);
app.use("/api/user/post",postRoute);
app.use("/api/user/profile",userRoute)


connectDB();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
