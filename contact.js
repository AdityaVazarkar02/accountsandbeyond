// Contact Form Elements
const form = document.getElementById("contactForm");
const result = document.getElementById("result");
const submitBtn = document.querySelector(".submit-btn");
const faqItems = document.querySelectorAll(".faq-item");

// Form Submission Handling
form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Show loading state
    const originalText = submitBtn.querySelector(".btn-text").textContent;
    submitBtn.querySelector(".btn-text").textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    
    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            result.innerHTML = "✅ Message Sent Successfully! We'll get back to you soon.";
            result.style.color = "#27ae60";
            form.reset();
            // Reset floating labels
            resetFloatingLabels();
        } else {
            result.innerHTML = "❌ Failed to send message. Please try again.";
            result.style.color = "#e74c3c";
        }
    })
    .catch(() => {
        result.innerHTML = "❌ Network Error! Please check your connection.";
        result.style.color = "#e74c3c";
    })
    .finally(() => {
        // Reset button state
        submitBtn.querySelector(".btn-text").textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
        
        // Clear result message after 5 seconds
        setTimeout(() => {
            result.innerHTML = "";
        }, 5000);
    });
});

// Reset floating labels after form submission
function resetFloatingLabels() {
    const inputs = form.querySelectorAll("input, textarea, select");
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
    const elements = document.querySelectorAll('.contact-info, .contact-form-section, .map-section, .faq-section');
    
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
});

// Add hover effects to info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});
