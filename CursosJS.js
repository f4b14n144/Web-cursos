document.addEventListener('DOMContentLoaded', () => {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const coursesContainer = document.getElementById('coursesContainer');

    if (courses.length === 0) {
        coursesContainer.innerHTML = "<p>No hay cursos disponibles.</p>";
    } else {
        courses.forEach((course, index) => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            courseCard.innerHTML = `
                <div class="course-info">
                    <p>${course.duration} semanas</p>
                    <h3>${course.courseName}</h3>
                    <p>Instructor: ${course.instructorName}</p>
                    <p>Fecha de inicio: ${course.startDate}</p>
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                    <button class="details-btn" data-index="${index}">Ver más detalles</button>
                    <div class="course-details" id="details-${index}" style="display: none;">
                        <p>${course.description}</p>
                    </div>
                </div>
            `;
            coursesContainer.appendChild(courseCard);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteCourse);
        });

        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', toggleDetails);
        });
    }
});

function toggleDetails(event) {
    const index = event.target.getAttribute('data-index');
    const details = document.getElementById(`details-${index}`);
    
    if (details.style.display === "none") {
        details.style.display = "block";
        event.target.textContent = "Ocultar detalles";
    } else {
        details.style.display = "none";
        event.target.textContent = "Ver más detalles";
    }
}

function deleteCourse(event) {
    const courseIndex = event.target.getAttribute('data-index');
    const courseCard = event.target.closest('.course-card');
    
    courseCard.style.animation = 'fadeOut 0.5s forwards';
    
    setTimeout(() => {
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.splice(courseIndex, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        courseCard.remove();

        // Actualizar los índices después de eliminar el curso
        document.querySelectorAll('.delete-btn').forEach((button, index) => {
            button.setAttribute('data-index', index);
        });
        document.querySelectorAll('.details-btn').forEach((button, index) => {
            button.setAttribute('data-index', index);
        });
    }, 400);  
}
