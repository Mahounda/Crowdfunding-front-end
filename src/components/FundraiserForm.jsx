import "../pages/Forms.css";
import { useState } from "react";
import postFundraiser from "../api/post-fundraiser.js";
import { useNavigate } from "react-router-dom";
import "../components/NavBar.css";

function FundraiserForm() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: 0,
    image: "",
    is_open: true,
  });

    const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "goal" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (!formData.goal || Number(formData.goal) <= 0) {
  alert("Goal must be a positive number");
  return;
  }

  // Ensure goal is a number
  const payload = {
    ...formData,
    goal: Number(formData.goal),
  };
  const response = await postFundraiser(payload, token);

  navigate(`/fundraisers/${response.id}`);
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="enter description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          type="number"
          placeholder="enter goal"
          value={formData.goal}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="text"
          placeholder="enter image URL"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Create Fundraiser</button>
    </form>
  );
}

export default FundraiserForm