// Importa el módulo axios
import axios from "axios";

// URL de la API que deseas consumir
const apiUrl = 'http://localhost:4000/api/tasks' ;

// Función para realizar una solicitud GET a la API
export async function fetchData() {
  try {
    // Realiza la solicitud GET
    const response = await axios.get(apiUrl);

    // Imprime los datos de la respuesta
    console.log('Datos de la API:', response.data);
    return response
  } catch (error) {
    // Manejo de errores
    console.error('Error al consumir la API:', error.message);
  }
}

// Llama a la función para consumir la API

