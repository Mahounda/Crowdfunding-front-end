import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./EditFundraiserPage.css";

function EditFundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
  });

  // Load existing fundraiser data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          description: data.description,
          goal: data.goal,
          image: data.image,
          is_open: data.is_open,
        });
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      navigate(`/fundraisers/${id}`); 
    } else {
      alert("Failed to update fundraiser");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Fundraiser</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={10}
          />
        </label>

        <label>
          Goal:
          <input
            type="number"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            min="1"
          />
        </label>

        <label>
          Image URL:
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="is_open"
            checked={formData.is_open}
            onChange={handleChange}
          />
          Fundraiser Open
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditFundraiserPage;
