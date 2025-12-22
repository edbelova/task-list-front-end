import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const kbaseURL = 'http://127.0.0.1:5000';
const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete ? apiTask.is_complete : false,
  };
  delete newTask.is_complete;
  return newTask;
};

/*need refactor */
const toggleCompleteApi = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
  return axios.patch(`${kbaseURL}/tasks/${id}/${endpoint}`)
    .then(() => {
      return getAllTasksAPI();
    })
    .catch(error => console.log(error));
};

const deleteTaskApi = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};

const addTaskApi = (newData) => {
  const { title, isComplete } = newData;

  const completedAt = isComplete === 'true' ? new Date() : null;
  const description = 'Test Description';

  return axios.post(`${kbaseURL}/tasks`, {
    title,
    description,
    'completed_at': completedAt
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
};


const App = () => {
  const [tasks, setTasks] = useState([]);
  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(convertFromAPI);
        setTasks(newTasks);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  const handleToggleComplete = (taskId) => {
    const currentTask = tasks.find(task => task.id === taskId);
    const newIsComplete = !currentTask.isComplete;
    toggleCompleteApi(taskId, newIsComplete)
      .then(response => {
        const newTasks = response.map(convertFromAPI);
        setTasks(newTasks);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  };

  const handleDeleteTask = (taskId) => {
    return deleteTaskApi(taskId)
      .then(() => {
        setTasks(TASKS => {
          return TASKS.filter(task => task.id !== taskId);
        });
      })
      .catch(error => console.log(error));
  };
  const handleAddNewTask = (newData) => {
    addTaskApi(newData)
      .then(response => {
        const convertedNewTask = convertFromAPI(response);
        setTasks([...tasks, convertedNewTask]);
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks}
          onToggleComplete={handleToggleComplete}
          handleDeleteTask={handleDeleteTask}
        />}
        </div>
        <div>
          <NewTaskForm onAddNewTask={handleAddNewTask}></NewTaskForm>
        </div>
      </main>
    </div>
  );
};

export default App;
