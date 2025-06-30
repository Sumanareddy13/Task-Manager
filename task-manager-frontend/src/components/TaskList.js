import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTask from "./EditTask"; // Importing the EditTask component

const TaskList = ({ tasks, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Fetch tasks when component mounts (if not already handled in parent)
  useEffect(() => {
    console.log("Fetching tasks...");
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  const deleteTask = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);
      await axios.delete(`http://localhost:8080/manage/${taskId}`);
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (taskId) => {
    setSelectedTaskId(taskId);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTaskId(null);
  };

  return (
    <div>
      <h2>Task List</h2>
      {isEditing && selectedTaskId ? (
        <EditTask taskId={selectedTaskId} fetchTasks={fetchTasks} onCancel={handleCancelEdit} />
      ) : (
        <ul>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id || task.id}>
                <span>{task.title} - {task.dueDate || "No Due Date"}</span>
                <button onClick={() => handleEdit(task._id || task.id)}>Edit</button>
                <button onClick={() => deleteTask(task._id || task.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </ul>
      )}
      {isEditing && <button onClick={handleCancelEdit}>Cancel Edit</button>}
    </div>
  );
};

export default TaskList;
