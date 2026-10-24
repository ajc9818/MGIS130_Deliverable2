// --- 1. DATA LAYER ---
let courses = JSON.parse(localStorage.getItem('gpa_courses')) || [];

function saveCourses() {
  localStorage.setItem('gpa_courses', JSON.stringify(courses));
}

// --- 2. PROCESSING LAYER ---
function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    totalPoints += course.credits * course.grade;
    totalCredits += course.credits;
  });

  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  return { gpa, totalCredits };
}

// --- 3. PRESENTATION / UI LAYER ---
const form = document.getElementById('course-form');
const courseList = document.getElementById('courses-list');
const gpaDisplay = document.getElementById('gpa-val');
const creditsDisplay = document.getElementById('total-credits');

function renderUI() {
  courseList.innerHTML = '';

  courses.forEach((course, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.name}</td>
      <td>${course.credits}</td>
      <td>${course.grade}</td>
      <td><button class="delete-btn" onclick="deleteCourse(${index})">Remove</button></td>
    `;
    courseList.appendChild(row);
  });

  const results = calculateGPA();
  gpaDisplay.textContent = results.gpa;
  creditsDisplay.textContent = results.totalCredits;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nameInput = document.getElementById('course-name');
  const creditsInput = document.getElementById('course-credits');
  const gradeInput = document.getElementById('course-grade');

  const newCourse = {
    name: nameInput.value,
    credits: parseFloat(creditsInput.value),
    grade: parseFloat(gradeInput.value)
  };

  courses.push(newCourse);
  saveCourses();
  renderUI();

  nameInput.value = '';
});

function deleteCourse(index) {
  courses.splice(index, 1);
  saveCourses();
  renderUI();
}

renderUI();