document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact_form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    const requiredFields = ["name", "email", "phone", "message"];
    const emptyFields = requiredFields.filter((field) => !values[field].trim());

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        alert(`Please enter a value for ${field}`);
      });
      return;
    }

    const submitButton = document.getElementById("send_message");
    const originalText = submitButton.value;
    submitButton.value = "Sending...";
    submitButton.disabled = true;

    const emailBody = `Name: ${values.name}\n\nEmail: ${values.email}\n\nPhone: ${values.phone}\n\nMessage:\n${values.message}`;

    const payload = {
      to: "therapy.org.in@gmail.com",
      subject: "You have a new message from Therapy.org.in",
      body: emailBody,
    };

    try {
      const response = await fetch(
        "https://smtp-api-tawny.vercel.app/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Email sent successfully");
        contactForm.reset();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send email");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      submitButton.value = originalText;
      submitButton.disabled = false;
    }
  });
});
