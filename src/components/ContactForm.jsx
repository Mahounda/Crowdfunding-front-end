import "../pages/Forms.css";
import { useState } from "react";
import "../components/NavBar.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Message:", formData.message);

    // Later: send to backend or email service
    alert("Message sent!");
  };

return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Your name"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          placeholder="Write your message"
          rows="5"
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </form>
);
}

export default ContactForm;

