const scriptURL =
  "https://script.google.com/macros/s/AKfycbxK8peKoqsy5T2YcTd415fgvL44BMs2cMIkvWwqfmqKlr3JzMAaKcKnvtM4Jv45NkA/exec";

function handleSubmit(event) {
  event.preventDefault();
  const form = document.forms["google-sheet"];
  const submitButton = form.querySelector('button[type="submit"]');

  // Check if all form fields are filled
  const formInputs = form.querySelectorAll("input, textarea");
  let isValid = true;
  let emptyFields = [];

  formInputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      emptyFields.push(input.name || "Unknown field");
    }
  });

  if (!isValid) {
    showNotification(
      `Please fill in all fields. Missing: ${emptyFields.join(", ")}`,
      "error"
    );
    return;
  }

  // Disable the submit button to prevent double submission
  if (submitButton) submitButton.disabled = true;

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      showNotification(
        "Thanks for submitting! We'll get in touch with you soon.",
        "success"
      );
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      showNotification("Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      // Re-enable the submit button
      if (submitButton) submitButton.disabled = false;
    });
}

function showNotification(message, type) {
  // You can either use alert or create a more sophisticated notification
  // For now, we'll use alert to keep it simple
  alert(message);
}

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => (slide.style.display = "none"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].style.display = "block";
    dots[index].classList.add("active");
  }

  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Show first slide initially
  showSlide(0);
});
