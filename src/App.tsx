import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddTask from "./Pages/AddTask";
import { TaskProvider } from "./Context/TaskContext";
import './Styles/App.css'

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}
