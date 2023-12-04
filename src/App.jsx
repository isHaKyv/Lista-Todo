// AppTemplate.jsx
import React, { useEffect, useState } from "react";
import HeaderMolecule from "../src/Components/Moleculas/HeaderMolecule";
import TasksOrganism from "../src/Components/Organismos/TasksOrganism";
import ErrorBoundary from '../src/Components/Organismos/Error';
import { fetchData } from "./apiConsumer.mjs";


const LOCAL_STORAGE_KEY = 'todo:tasks';

function AppTemplate() {
  const tasksI = fetchData()
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    console.log(tasksI)
    loadSavedTasks();
  }, [])

  function addTask(taskTitle) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
    <ErrorBoundary>
      <HeaderMolecule handleAddTask={addTask} />
      <TasksOrganism
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
      </ErrorBoundary>
    </>
    
  );
}

export default AppTemplate;
