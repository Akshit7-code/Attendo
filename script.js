const nameInput = document.getElementById("nameInput");
const createListBtn = document.getElementById("createList");
const generateTextBtn = document.getElementById("generateText");
const studentListDiv = document.getElementById("studentList");
const studentCheckboxes = document.getElementById("studentCheckboxes");

// Load students from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    let savedStudents = JSON.parse(localStorage.getItem("students")) || [];

    if (savedStudents.length > 0) {
        document.querySelector(".input-section").style.display = "none"; 
        studentListDiv.style.display = "block"; 
        renderStudentList(savedStudents);
    }
});

createListBtn.addEventListener("click", () => {
    const listName = nameInput.value.trim();

    if (listName) {
        document.querySelector(".input-section").style.display = "none";
        studentListDiv.style.display = "block";

        const students = listName.split("\n").map(name => name.trim()).filter(name => name !== "");

        localStorage.setItem("students", JSON.stringify(students));
        renderStudentList(students);
        nameInput.value = "";
    }
});

// Function to render student list
function renderStudentList(students) {
    studentCheckboxes.innerHTML = ""; 

    students.forEach(student => {
        const studentItem = document.createElement("div");
        studentItem.className = "student-item";
        studentItem.innerHTML = `
            <input type="checkbox" id="${student}" name="${student}">
            <label for="${student}">${student}</label>
        `;
        studentCheckboxes.appendChild(studentItem);
    });

    // Add Reset Button (To Clear List and Go Back to Input Section)
    if (!document.getElementById("resetBtn")) {
        const resetBtn = document.createElement("button");
        resetBtn.innerText = "Reset";
        resetBtn.id = "resetBtn";
        resetBtn.classList.add("primary-button");
        resetBtn.addEventListener("click", () => {
            localStorage.removeItem("students");
            studentCheckboxes.innerHTML = "";
            document.querySelector(".input-section").style.display = "block";
            studentListDiv.style.display = "none";
        });
        studentListDiv.appendChild(resetBtn);
    }
}

// Function to generate pop-up with selected names
generateTextBtn.addEventListener("click", () => {
    const checkedStudents = [];
    const checkboxes = document.querySelectorAll("#studentCheckboxes input[type='checkbox']");

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            checkedStudents.push(`${checkedStudents.length + 1}. ${checkbox.name}`);
        }
    });

    if (checkedStudents.length > 0) {
        showPopup(checkedStudents.join("\n")); 
    }
});

// Function to show pop-up box with numbered selected names
function showPopup(names) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";

    // Create pop-up box
    const popupBox = document.createElement("div");
    popupBox.style.background = "#fff";
    popupBox.style.padding = "20px";
    popupBox.style.borderRadius = "10px";
    popupBox.style.textAlign = "center";
    popupBox.style.width = "300px";
    popupBox.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";

    // Create text area
    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = "150px";
    textArea.style.marginBottom = "10px";
    textArea.readOnly = true;
    textArea.value = names;

    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-button");
    copyButton.innerText = "Copy";
    copyButton.style.marginRight = "10px";
    copyButton.addEventListener("click", () => {
        textArea.select();
        document.execCommand("copy");
    });

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button2");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    // Append elements to pop-up
    popupBox.appendChild(textArea);
    popupBox.appendChild(copyButton);
    popupBox.appendChild(closeButton);
    overlay.appendChild(popupBox);

    // Append pop-up to body
    document.body.appendChild(overlay);
}


document.getElementById("searchBar").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const students = document.querySelectorAll("#studentCheckboxes .student-item");

    students.forEach(student => {
        const name = student.innerText.toLowerCase();
        student.style.display = name.includes(query) ? "flex" : "none";
    });
});
