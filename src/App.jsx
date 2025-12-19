import { useState } from 'react';
import { useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://task-list-api-ai1b.onrender.com/tasks')
      .then((response) => {
        setTasks(response.data.map((task) => ({
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        })));
      })
      .catch((error) => {
        setErrorMessage('Error fetching tasks. Please try again later.');
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const updateTask = (id) => {
    if (tasks.find((task) => task.id === id).isComplete) {
      axios
        .patch(`https://task-list-api-ai1b.onrender.com/tasks/${id}/mark_incomplete`)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? { ...task, isComplete: !task.isComplete } : task
            )
          );})
        .catch((error) => {
          setErrorMessage('Error updating task. Please try again later.');
          console.error('There was an error updating the task!', error);
        });
    }
    else {
      axios
        .patch(`https://task-list-api-ai1b.onrender.com/tasks/${id}/mark_complete`)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? { ...task, isComplete: !task.isComplete } : task
            )
          );})
        .catch((error) => {
          setErrorMessage('Error updating task. Please try again later.');
          console.error('There was an error updating the task!', error);
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(`https://task-list-api-ai1b.onrender.com/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        setErrorMessage('Error deleting task. Please try again later.');
        console.error('There was an error deleting the task!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />}</div>
        {errorMessage}
      </main>
    </div>
  );
};

export default App;
