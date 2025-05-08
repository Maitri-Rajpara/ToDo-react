import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/TaskList/TaskListPage";
import AddTask from "./Components/AddEditTask/AddTask";
import { TaskProvider } from "./Context/TaskProvider";
import './App.css'

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
