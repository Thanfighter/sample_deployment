import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("Failed to load tasks.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: trimmedTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task.");
      }

      const newTask = await response.json();
      setTasks((currentTasks) => [newTask, ...currentTasks]);
      setTitle("");
    } catch (submitError) {
      setError(submitError.message || "Something went wrong.");
    }
  };

  const handleToggle = async (task) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task.");
      }

      const updatedTask = await response.json();
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === updatedTask._id ? updatedTask : currentTask
        )
      );
    } catch (updateError) {
      setError(updateError.message || "Something went wrong.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== taskId)
      );
    } catch (deleteError) {
      setError(deleteError.message || "Something went wrong.");
    }
  };

  return (
    <main className="app">
      <div className="container">
        <h1>Task Manager</h1>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a task"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {error ? <p className="message error">{error}</p> : null}
        {loading ? <p className="message">Loading tasks...</p> : null}
        {!loading && tasks.length === 0 ? (
          <p className="message">No tasks yet.</p>
        ) : null}

        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task._id}>
              <span className={task.completed ? "task-title completed" : "task-title"}>
                {task.title}
              </span>

              <div className="task-actions">
                <button type="button" onClick={() => handleToggle(task)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
