import { useState } from "react";
import postFundraiser from "../api/post-Fundraiser.js";
import { useNavigate } from "react-router-dom";

function FundraiserForm() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postFundraiser(formData, token).then(() => {
      console.log("Fundraiser created:", response);
      navigate("/fundraisers/${response.id}");
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          placeholder="enter description"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          type="number"
          placeholder="enter goal"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="text"
          placeholder="enter image URL"
          onChange={handleChange}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create Fundraiser
      </button>
    </form>
  );
}

export default FundraiserForm;
