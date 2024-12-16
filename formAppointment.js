document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact_form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = {
      service: document.getElementById("service").value,
      date: document.querySelector("#date input").value,
      time: document.getElementById("time").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    const requiredFields = [
      "service",
      "date",
      "time",
      "name",
      "email",
      "phone",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !values[field]?.trim()
    );

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

    const emailBody = `Service: ${values.service}\n\nDate: ${values.date}\n\nTime: ${values.time}\n\nName: ${values.name}\n\nEmail: ${values.email}\n\nPhone: ${values.phone}\n\nMessage:\n${values.message}`;

    const payload = {
      to: "therapy.org.in@gmail.com",
      subject: "New Appointment Request From Therapy.org.in",
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
        alert("Appointment request sent successfully");
        // Reset form fields
        contactForm.reset();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to send appointment request");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      submitButton.value = originalText;
      submitButton.disabled = false;
    }
  });
});
