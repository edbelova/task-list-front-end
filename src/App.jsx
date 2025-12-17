import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];


const App = () => {
  const [tasks, setTasks] = useState(TASKS);
  const handleToggleComplete = (taskId) => {
    setTasks(TASKS => {
      return TASKS.map(task => {
        return (taskId === task.id) ? {
          ...task, isComplete: !task.isComplete
        } : task;
      });
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(TASKS => {
      return TASKS.filter(task => task.id !== taskId);
    });
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
      </main>
    </div>
  );
};

export default App;
