import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ taskId, fetchTasks }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/${taskId}`);
        setTaskTitle(response.data.title);
        setTaskDescription(response.data.description);
        setTaskDueDate(response.data.dueDate);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title: taskTitle, description: taskDescription, dueDate: taskDueDate };
    try {
      await axios.put(`http://localhost:8080/api/tasks/${taskId}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTask;
