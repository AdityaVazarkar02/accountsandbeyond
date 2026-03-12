// Admissions Page JavaScript

// Form Elements
const admissionForm = document.getElementById("admissionForm");
const admissionResult = document.getElementById("admissionResult");
const submitBtn = document.querySelector(".submit-btn");
const courseEnrollButtons = document.querySelectorAll(".course-enroll-btn");
const faqItems = document.querySelectorAll(".faq-item");
const courseSelected = document.getElementById("courseSelected");





// Pre-fill course selection from course cards
// Pre-fill course selection from course cards
courseEnrollButtons.forEach(button => {
    button.addEventListener("click", function() {
        const courseName = this.getAttribute("data-course");
        const courseSelect = document.querySelector('select[name="preferred_course"]');
        
        if (courseSelect) {
            courseSelect.value = courseName;
            courseSelected.value = courseName;
            
            document.getElementById("admission-form").scrollIntoView({
                behavior: "smooth"
            });
            
            this.textContent = "Selected!";
            this.classList.add("selected");
            
            setTimeout(() => {
                this.textContent = "Enroll Now";
                this.classList.remove("selected");
            }, 2000);
        }
    });
});




// Form Submission Handling
admissionForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Show loading state
    const btnText = submitBtn.querySelector(".btn-text");
    const originalText = btnText ? btnText.textContent : submitBtn.textContent;

    if (btnText) {
    btnText.textContent = "Processing...";
} else {
    submitBtn.textContent = "Processing...";
}

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    
    const formData = new FormData(admissionForm);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            admissionResult.innerHTML = "✅ Application Submitted Successfully! Our admission team will contact you within 24 hours.";
            admissionResult.style.color = "#27ae60";
            admissionForm.reset();
            resetFloatingLabels();
        } else {
            admissionResult.innerHTML = "❌ Failed to submit application. Please try again.";
            admissionResult.style.color = "#e74c3c";
        }
    })
    .catch(() => {
        admissionResult.innerHTML = "❌ Network Error! Please check your connection and try again.";
        admissionResult.style.color = "#e74c3c";
    })
    .finally(() => {
        // Reset button state
      if (btnText) {
    btnText.textContent = originalText;
} else {
    submitBtn.textContent = originalText;
}


        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
        
        // Clear result message after 8 seconds
        setTimeout(() => {
            admissionResult.innerHTML = "";
        }, 8000);
    });
});

// Reset floating labels after form submission
function resetFloatingLabels() {
    const inputs = admissionForm.querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label && label.tagName === "LABEL") {
            label.style.top = "";
            label.style.fontSize = "";
            label.style.background = "";
            label.style.padding = "";
            label.style.color = "";
        }
    });
}

// FAQ Accordion Functionality
faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    
    question.addEventListener("click", () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });
        
        // Toggle current item
        item.classList.toggle("active");
    });
});

// Add animation classes on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.step-card, .course-card, .requirement-item, .testimonial-card, .admission-form-section');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in-up');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger animation on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('.input-wrapper input, .textarea-wrapper textarea, .select-wrapper select');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add hover effects to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add hover effects to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation enhancement
const formInputs = document.querySelectorAll('#admissionForm input, #admissionForm select, #admissionForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.parentElement.classList.add('error');
        } else {
            this.parentElement.classList.remove('error');
        }
        
        if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        }
    });
});

// Phone number validation
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });
}

// Add counter for textarea
const messageTextarea = document.querySelector('textarea[name="message"]');
if (messageTextarea) {
    const maxLength = 500;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0/${maxLength}`;
    messageTextarea.parentNode.appendChild(counter);
    
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
        counter.style.color = currentLength > maxLength * 0.9 ? '#e74c3c' : '#666';
        
        if (currentLength > maxLength) {
            this.value = this.value.slice(0, maxLength);
            counter.textContent = `${maxLength}/${maxLength}`;
        }
    });
}

// Add loading animation to buttons
const loadingButtons = document.querySelectorAll('.btn');
loadingButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit' || this.classList.contains('course-enroll-btn')) {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        }
    });
});

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
            testimonial.classList.add('active');
        } else {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
        }
    });
}

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Add to calendar functionality (for batch timings)
const addToCalendarButtons = document.querySelectorAll('.add-to-calendar');
addToCalendarButtons.forEach(button => {
    button.addEventListener('click', function() {
        const batchTime = this.getAttribute('data-time');
        // This would integrate with calendar APIs in a real implementation
        alert(`Added ${batchTime} to your calendar!`);
    });
});

// Print functionality for admission form
const printButton = document.createElement('button');
printButton.textContent = '🖨️ Print Application';
printButton.className = 'btn secondary-btn print-btn';
printButton.addEventListener('click', function() {
    window.print();
});

// Add print button to form section
const formSection = document.querySelector('.admission-form-section .form-wrapper');
if (formSection) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'form-buttons';
    buttonContainer.appendChild(printButton);
    formSection.appendChild(buttonContainer);
}