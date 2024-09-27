form.addEventListener('submit', function (e) {
    e.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const instructorName = document.getElementById('instructorName').value;
    const startDate = document.getElementById('startDate').value;
    const duration = document.getElementById('duration').value;
    const description = document.getElementById('description').value;

    if (!courseName || !instructorName || !startDate || !duration || !description) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const newCourse = {
        courseName,
        instructorName,
        startDate,
        duration,
        description
    };

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    addCourseToList(newCourse);

    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Curso añadido correctamente.';
    
    // Mostrar el div aplicando la clase 'show'
    messageDiv.classList.remove('hide');
    messageDiv.classList.add('show');

    // Ocultar el div después de 3 segundos
    setTimeout(() => {
        messageDiv.classList.remove('show');
        messageDiv.classList.add('hide');
    }, 3000);

    form.reset();
});
