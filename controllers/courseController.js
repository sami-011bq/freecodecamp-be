import Course from "../models/courseModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import courses from "../data/courses.js";

// To seed mock data
const seedCourses = asyncHandler(async (req, res) => {
  await Course.deleteMany({}); // delete existing courses
  await Course.insertMany(courses);

  res.status(201).json({ message: "Courses inserted successfully" });
});

const getCourses = asyncHandler(async (req, res) => {
  const allCourses = await Course.find().select("title duration");
  res.status(200).json({ message: "Success", data: allCourses });
});

export { seedCourses, getCourses };
