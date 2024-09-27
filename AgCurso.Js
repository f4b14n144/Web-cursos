// Cargar cursos desde localStorage 
document.addEventListener('DOMContentLoaded', () => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    savedCourses.forEach(course => addCourseToList(course));
});

// Referencias al formulario y la lista de cursos
const form = document.getElementById('courseForm');
const coursesList = document.getElementById('coursesList');

// Manejador de evento 
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores 
    const courseName = document.getElementById('courseName').value;
    const instructorName = document.getElementById('instructorName').value;
    const startDate = document.getElementById('startDate').value;
    const duration = document.getElementById('duration').value;
    const description = document.getElementById('description').value;

    // Validación simple
    if (!courseName || !instructorName || !startDate || !duration || !description) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un objeto de curso
    const newCourse = {
        courseName,
        instructorName,
        startDate,
        duration,
        description
    };

   //local storage
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    // lista visual
    addCourseToList(newCourse);

    //  mensaje de confirmación 
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Curso añadido correctamente.';
    messageDiv.style.display = 'block';

    // Ocultar el mensaje 
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);

   
    form.reset();
});

// Función para agregar un curso a la lista 
function addCourseToList(course) {
    const courseItem = document.createElement('div');
    courseItem.classList.add('course-item');
    courseItem.innerHTML = `
        <h3>${course.courseName}</h3>
        <p><strong>Instructor:</strong> ${course.instructorName}</p>
        <p><strong>Fecha de Inicio:</strong> ${course.startDate}</p>
        <p><strong>Duración:</strong> ${course.duration} semanas</p>
        <p><strong>Descripción:</strong> ${course.description}</p>
    `;
    coursesList.appendChild(courseItem);
}
