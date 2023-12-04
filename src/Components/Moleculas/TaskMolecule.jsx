import React from 'react';
import ButtonAtom from '../Atomos/ButtonAtom';
import IconAtom from '../Atomos/IconAtom';
import styles from './task.module.css';
import { TbTrash } from 'react-icons/tb';
import { BsFillCheckCircleFill } from 'react-icons/bs';



function TaskMolecule({ task, onDelete, onComplete }) {
  return (
    <div className={styles.task}>
      <ButtonAtom className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <IconAtom icon={BsFillCheckCircleFill} /> : <div />}
      </ButtonAtom>

      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>

      <ButtonAtom className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <IconAtom icon={TbTrash} size={20} />
      </ButtonAtom>
    </div>
  );
}

export default TaskMolecule;
