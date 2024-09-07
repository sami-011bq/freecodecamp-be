import express from "express";

const PORT = process.env.PORT || 8000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
