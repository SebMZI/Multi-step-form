const alertBox = document.querySelector(".alert-box");

const form = document.querySelector(".form-questions");
const formDots = document.querySelectorAll(".form-index-dot");
const formTitle = document.querySelector(".form-title");
const formButton = document.querySelector(".form-button");
const formindex = document.querySelector(".form-index-number");
const container = document.querySelector(".form-container");

let formAnswers = {};
let step = 1;

function showAlert(message, type) {
  alertBox.style.opacity = 1;
  alertBox.textContent = message;
  alertBox.style.transform = "translateY(0px)";
  alertBox.style.borderColor = type === "error" ? "red" : "green";
  alertBox.style.color = type === "error" ? "red" : "green";

  setTimeout(() => {
    alertBox.style.transform = "translateY(-100px)";
    alertBox.style.opacity = 0;
  }, 2500);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (step === 1) {
    if (e.target[0].value === "" || e.target[1].value === "") {
      showAlert("Please fill in all fields!", "error");
      return;
    }
    formAnswers.name = e.target[0].value;
    formAnswers.email = e.target[1].value;
  }

  if (step === 2) {
    if (!formAnswers.topics || Object.keys(formAnswers.topics).length === 0) {
      showAlert("Please choose at least one topic!", "error");
      return;
    }
  }

  if (step < 4) {
    formDots[step - 1].classList.remove("dot-active");
    formDots[step - 1].classList.add("dot-answered");
    step++;
    if (step !== 4) {
      formDots[step - 1].classList.add("dot-active");
      formindex.textContent = step;
    }
  }

  if (step === 2) {
    let topics = {
      0: "Software Development",
      1: "User Experience",
      2: "Graphic Design",
    };
    const questionsToRemove = document.querySelectorAll(".form-question");
    questionsToRemove.forEach((question) => {
      question.remove();
    });

    formTitle.textContent = "Which topics you are interested in?";
    for (let i = 0; i < Object.keys(topics).length; i++) {
      const question = document.createElement("div");
      question.classList.add("form-topics");
      question.innerHTML = topics[i];
      form.insertBefore(question, formButton);
      form.style.marginTop = "40px";
      question.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        if (!formAnswers.topics) {
          formAnswers.topics = {};
        }
        if (formAnswers.topics[i]) {
          delete formAnswers.topics[i];
        } else {
          formAnswers.topics[i] = e.target.textContent;
        }
        console.log(formAnswers.topics);
        question.classList.toggle("topics-active");
      });
    }
  } else if (step === 3) {
    formTitle.textContent = "Summary";
    const question = document.querySelectorAll(".form-topics");
    question.forEach((question) => {
      question.remove();
    });

    const details = document.createElement("div");
    details.classList.add("form-summary-details");
    details.innerHTML = `
    <p>Name: <span class="form-summary-details-value">${formAnswers.name}</span></p>
    <p>Email: <span class="form-summary-details-value">${formAnswers.email}</span></p>
    `;
    const topicsDetails = document.createElement("div");
    topicsDetails.classList.add("form-summary-details");
    topicsDetails.innerHTML = `
    <p>Topics:</p>
    <ul>
    ${Object.values(formAnswers.topics)
      .map((topic) => `<li class="form-summary-details-value">${topic}</li>`)
      .join("")}
    </ul>
    `;
    form.insertBefore(details, formButton);
    form.insertBefore(topicsDetails, formButton);
    formButton.textContent = "Confirm";
  } else if (step === 4) {
    const details = document.querySelectorAll(".form-summary-details");
    details.forEach((detail) => {
      detail.remove();
    });
    formTitle.remove();
    formButton.remove();
    form.remove();
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.innerHTML = "<p class='form-success'>✅ Success</p>";
  }
});
