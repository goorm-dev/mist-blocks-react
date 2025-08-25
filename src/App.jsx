import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Detail } from "./pages/Detail";

import { COURSE_LIST, COURSE_INFORMATION } from "./constants/CourseInformation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {COURSE_LIST.map((course) => (
        <Route key={course} path={`/${COURSE_INFORMATION[course].keyword}`} element={<Detail course={course} />} />
      ))}
    </Routes>
  );
}

export default App;
