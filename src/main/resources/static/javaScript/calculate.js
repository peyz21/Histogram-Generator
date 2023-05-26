// I want to make a disclaimer, I used chatGPT at the end for assisting me wtih my  SPAN tags in the div of my histogram,
// since the Aesthetic of the work in the assignment also matters.

// Initial array of grades
var grades = [
  65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.0, 81.43, 86.22, 88.33,
  9.03, 49.93, 52.34, 53.11, 50.1, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54,
  90.0, 71.11, 80.01,
];

// Definition of grade levels in descending order
let order = [
  "Max",
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D",
  "F",
];

// Select all input fields for grade boundaries
let inputFields = document.querySelectorAll(".inputField");

// Object to store the grade boundaries
let bounds = {};

// the counts Initialize count of each grade to 0
const counts = {
  "A+": 0,
  A: 0,
  "A-": 0,
  "B+": 0,
  B: 0,
  "B-": 0,
  "C+": 0,
  C: 0,
  "C-": 0,
  D: 0,
  F: 0,
};

var totalGrades = grades.length;

// Function to update grade counts in each bound
function updateCounts() {
  for (let grade in counts) {
    counts[grade] = 0;
  }
  grades.forEach((grade) => {
    if (grade === bounds["Max"]) {
      counts["A+"]++;
    } else {
      for (let i = order.length - 1; i >= 0; i--) {
        if (
          grade >= bounds[order[i]] &&
          (i == 0 || grade < bounds[order[i - 1]])
        ) {
          counts[order[i]]++;
          break;
        }
      }
    }
  });

  totalGrades = grades.length;

  // this loop Updates histogram based on updated counts
  for (let grade in counts) {
    if (grade != "Max") {
      let count = counts[grade];
      let percentage = (count / totalGrades) * 100;
      let histogramBar = document.querySelector(
        ".animated-progress.progress-" +
          grade.replace("+", "plus").replace("-", "minus") +
          " span"
      );
      histogramBar.style.width = `${percentage}%`;
      histogramBar.textContent = count.toString();
    }
  }
}

// this is the Function to check whether all grade boundaries have been entered
function allBoundsEntered() {
  for (let grade of order) {
    if (bounds[grade] === undefined) {
      return false;
    }
  }

  return true;
}

// For each input field, add event listener to update grade boundaries and counts when input is changed
inputFields.forEach((input) => {
  input.addEventListener("input", function () {
    let newValue = parseFloat(this.value);

    let index = order.indexOf(this.id);

    let prevVal = bounds[order[index - 1]];
    let nextVal = bounds[order[index + 1]];

    //validation
    let isValid =
      (prevVal === undefined || newValue < prevVal) &&
      (nextVal === undefined || newValue > nextVal);

    let newGradeInput = document.querySelector('input[name="newGrade"]');

    if (isValid) {
      this.style.borderColor = "initial";
      inputFields.forEach((otherInput) => {
        otherInput.disabled = false;
      });

      bounds[this.id] = newValue;
      updateCounts();

      if (allBoundsEntered()) {
        newGradeInput.disabled = false;
      }
    } else {
      this.style.borderColor = "red";
      inputFields.forEach((otherInput) => {
        if (otherInput !== this) {
          otherInput.disabled = true;
        }
      });

      newGradeInput.disabled = true;

      showModal(
        "Invalid input Bounds Overlap. Please ensure that each input is smaller than the one above it and greater than the one below it."
      );
    }

    //   console.log(bounds);
    //   console.log(counts);
  });
});

// this will allow the  submission of the newGrade using the button, also it does the validation for that
document
  .querySelector(".button-35")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let newGradeInput = document.querySelector('input[name="newGrade"]');

    if (newGradeInput.disabled) {
      showModal("Please enter all the bounds first");
      return;
    }

    let newGrade = parseFloat(newGradeInput.value);

    if (
      !isNaN(newGrade) &&
      newGrade >= bounds["F"] &&
      newGrade <= bounds["Max"]
    ) {
      //   console.log('Entered grade: ' + newGrade);
      grades.push(newGrade);

      updateCounts();
      //   console.log('Updated counts: ', counts);
      newGradeInput.value = "";
    } else {
      showModal(
        "Please enter a valid grade between " +
          bounds["F"] +
          " and " +
          bounds["Max"]
      );
    }
  });

// this is the code for MODAL Extra  :)

function showModal(message) {
  var modal = document.getElementById("myModal");

  var modalText = document.getElementById("modalText");

  modalText.textContent = message;

  modal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];

// When the user clicks on the (x), close the modal
span.onclick = function () {
  // Get the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

window.onclick = function (event) {
  var modal = document.getElementById("myModal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
};
