import Course from "../models/courseModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import courses from "../data/courses.js";

export default courses;

const seedCourses = asyncHandler(async (req, res) => {
  await Course.deleteMany({}); // delete existing courses
  await Course.insertMany(courses);

  res.status(201).json({ message: "Courses inserted successfully" });
});

export { seedCourses };
