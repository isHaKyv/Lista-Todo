// TasksOrganism.jsx
import React from 'react';
import TaskMolecule from '../Moleculas/TaskMolecule';
import styles from './tasks.module.css';

function TasksOrganism({ tasks, onDelete, onComplete }) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Crear Tarea</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Tareas Completas</p>
          <span>{completedTasks} de {tasksQuantity}</span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <TaskMolecule key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} />
        ))}
      </div>
    </section>
  );
}

export default TasksOrganism;
