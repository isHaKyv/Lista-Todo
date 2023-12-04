// HeaderMolecule.jsx
import React, { useState } from 'react';
import ButtonAtom from '../Atomos/ButtonAtom';
import InputAtom from '../Atomos/InputAtom';
import IconAtom from '../Atomos/IconAtom';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';  // Asegúrate de tener esta línea
import todoGato from '../../images/TodoGato.png';

function HeaderMolecule({ handleAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask(title);
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
      <img src={todoGato} />

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <InputAtom
          placeholder="Agregar nueva tarea"
          onChange={onChangeTitle}
          value={title}
        />
        <ButtonAtom>
          Agregar <IconAtom icon={AiOutlinePlusCircle} size={20} />
        </ButtonAtom>
      </form>
    </header>
  );
}

export default HeaderMolecule;