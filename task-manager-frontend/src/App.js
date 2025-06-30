import axios from "axios";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./style.css";


const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:8080/api/tasks", task, {
        headers: { "Content-Type": "application/json" },
      });
      setTasks([...tasks, response.data]); // Update UI
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  return (
    <div>
      <h1>Task Management System</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default App;
