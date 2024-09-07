import express from "express";
import connectDB from "./db/connectDB.js";

import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
