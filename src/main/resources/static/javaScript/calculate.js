// I want to make a disclaimer, I used chatGPT at the end for assisting me wtih my  SPAN tags in the div of my histogram, also i used it to make..
// the modal, since the Aesthetic of the work of the assignment also matters, also GPT helped me so that I can i can comment my code better! thanks!

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

// Initialize count of each grade to 0
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

// Calculate total grades
var totalGrades = grades.length;


// Function to update grade counts
function updateCounts() {
    
    for (let grade in counts) {
      counts[grade] = 0;
    }
  
    // For each grade in grades, increment the corresponding count
    grades.forEach((grade) => {
      // Check if grade is exactly Max first
      if (grade === bounds['Max']) {
        counts["A+"]++;
      } else {
        // If not, proceed with normal categorization
        for (let i = order.length - 1; i >= 0; i--) {
          // Check if the grade is between current and previous grade
          if (grade >= bounds[order[i]] && (i == 0 || grade < bounds[order[i - 1]])) {
            counts[order[i]]++;
            break;
          }
        }
      }
    });
  
    // Update totalGrades to reflect any changes in the grades array
    totalGrades = grades.length;
  
    // Update histogram based on updated counts
    for (let grade in counts) {
        if(grade != "Max"){ // Ignore 'Max' as it's not part of the histogram.
            let count = counts[grade]; 
            let percentage = (count / totalGrades) * 100;  // Calculate the percentage of total grades that this grade represents
            let histogramBar = document.querySelector('.animated-progress.progress-' + grade.replace('+', 'plus').replace('-', 'minus') + ' span');
            histogramBar.style.width = `${percentage}%`; // update width
            histogramBar.textContent = count.toString(); // update text content
          }
      }
    }


// Function to check whether all grade boundaries have been entered
function allBoundsEntered() {
    // For each grade in order, check if a boundary has been defined
  for (let grade of order) {
    // If any grade boundary is undefined, return false
    if (bounds[grade] === undefined) {
      return false;
    }
  }
  // If no boundaries are undefined, return true
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
  
      let newGradeInput = document.querySelector('input[name="newGrade"]'); // get newGradeInput field
  
      if (isValid) {
        this.style.borderColor = "initial";
        inputFields.forEach((otherInput) => {
          otherInput.disabled = false;
        });
  
        bounds[this.id] = newValue;
        updateCounts();
  
        // if all bounds are entered correctly, enable newGradeInput
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
  
        newGradeInput.disabled = true; // disable newGradeInput field if validation fails
  
        showModal(
          "Invalid input Bounds Overlap. Please ensure that each input is smaller than the one above it and greater than the one below it."
        );
      }
  
    //   console.log(bounds);
    //   console.log(counts);
    });
  });

  // this will allow the  submission of the newGrade using the button, also it does the validation for that
document.querySelector('.button-35').addEventListener('click', function(event) {
    event.preventDefault(); 
  
    let newGradeInput = document.querySelector('input[name="newGrade"]');
    
    if (newGradeInput.disabled) {
        showModal('Please enter all the bounds first');
      return;
    }
  
    let newGrade = parseFloat(newGradeInput.value);
  
    // Validate the input is a number and within the user-defined grade bounds
    if (!isNaN(newGrade) && newGrade >= bounds["F"] && newGrade <= bounds["Max"]) {
    //   console.log('Entered grade: ' + newGrade); 
      grades.push(newGrade);

      updateCounts();
    //   console.log('Updated counts: ', counts); 
      newGradeInput.value = ""; // clear the input field
    } else {
        showModal('Please enter a valid grade between ' + bounds["F"] + ' and ' + bounds["Max"]);
    }
});



// this is the code for MODAL Extra  :)

// Show the modal with a specific message
function showModal(message) {
    // Get the modal
    var modal = document.getElementById("myModal");
  
    // Get the element where the message will be placed
    var modalText = document.getElementById("modalText");
  
    // Put the message into the modal
    modalText.textContent = message;
  
    // Display the modal
    modal.style.display = "block";
  }
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    // Get the modal
    var modal = document.getElementById("myModal");
  
    // Hide the modal
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    // Get the modal
    var modal = document.getElementById("myModal");
  
    if (event.target == modal) {
      // Hide the modal
      modal.style.display = "none";
    }
  }