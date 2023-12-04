const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 4000;
const mysql2 = require('mysql2');

// Conexión a la base de datos
const db = mysql2.createConnection({
  host: 'database-2.c6kpu8frpjzo.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'todo_app',
}).promise();

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await db.connect()                               ;
    console.log('Servidor conectado a la base de datos');
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1); // Terminar la aplicación en caso de error de conexión
  }
}

// Conectar a la base de datos
connectToDatabase();

app.use(cors());
app.use(bodyParser.json());

// Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM tasks');
    res.json({ data: result });
  } catch (error) {
    console.error('Error al obtener todas las tareas:', error);
    res.status(500).json({ error: 'Error al obtener todas las tareas' });
  }
});

// Crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  try {
    // Insertar la nueva tarea en la base de datos
    const [result] = await db.query('INSERT INTO tasks (title, is_completed) VALUES (?, ?)', [title, false]);

    // Obtener la tarea recién insertada
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);

    // Enviar la nueva tarea como respuesta
    res.json(newTask[0]);
  } catch (error) {
    console.error('Error al crear una nueva tarea:', error);
    res.status(500).json({ error: 'Error al crear una nueva tarea' });
  }
});

// Eliminar una tarea
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

// Actualizar el estado de una tarea (completada o no)
app.put('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (task) {
      // Actualizar el estado de la tarea
      const newStatus = !task.is_completed;
      await db.query('UPDATE tasks SET is_completed = ? WHERE id = ?', [newStatus, taskId]);
      res.json({ success: true });
    } else {
      throw new Error('Task not found');
    }
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea:', error);
    res.status(500).json({ error: 'Error al actualizar el estado de la tarea' });
  }
});

// Manejo de cierre de la aplicación
process.on('SIGINT', () => {
  console.log('Deteniendo la aplicación...');
  db.end(); // Cerrar la conexión a la base de datos
  process.exit(); // Salir del proceso de Node.js
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
