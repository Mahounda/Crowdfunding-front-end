import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import "./FundraiserPage.css";

function FundraiserPage() {
  const { id } = useParams();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("user_id"));
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  const handleEditFundraiser = () => {
    navigate(`/fundraisers/${id}/edit`);
  };

  const handleEditPledge = (pledgeId) => {
    navigate(`/pledges/${pledgeId}/edit`);
  };

  const handleDeletePledge = async (pledgeId) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.status === 204) {
      window.location.reload();
    } else {
      alert("Failed to delete pledge");
    }
  };

  const handleDeleteFundraiser = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.status === 204) {
      navigate("/");
    } else {
      alert("Failed to delete fundraiser");
    }
  };
  
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const totalPledged = fundraiser.pledges.reduce(
    (sum, pledge) => sum + pledge.amount,
    0
  );

  const progress = Math.min((totalPledged / fundraiser.goal) * 100, 100);

  return (
    <div className="fundraiser-page">
      <h2>{fundraiser.title}</h2>

      {fundraiser.image && (
        <img
          src={fundraiser.image}
          alt={fundraiser.title}
          className="fundraiser-image"
        />
      )}

      <p className="fundraiser-description">{fundraiser.description}</p>

      <h3>Created at: {fundraiser.date_created}</h3>
      <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>

      <h3>Goal: ${fundraiser.goal}</h3>
      <h3>Total pledged: ${totalPledged}</h3>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {fundraiser.is_open && (
        <button onClick={() => navigate(`/pledges/new?fundraiser=${id}`)}>
          Add Pledge
        </button>
      )}

      {(fundraiser.owner === userId || isSuperuser) && (
        <button onClick={handleEditFundraiser}>Edit Fundraiser</button>
      )}

      {isSuperuser && (
        <button onClick={handleDeleteFundraiser}>Delete Fundraiser</button>
      )}

      <h3>Pledges:</h3>

      <ul>
        {fundraiser.pledges.map((pledgeData) => {
          return (
            <li key={pledgeData.id}>
              <strong>${pledgeData.amount}</strong> from{" "}
              {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter}

              <p>Comment: {pledgeData.comment}</p>

              {pledgeData.supporter === userId && fundraiser.is_open && (
                <button onClick={() => handleEditPledge(pledgeData.id)}>
                  Edit
                </button>
              )}

              {(pledgeData.supporter === userId && fundraiser.is_open) ||
              isSuperuser ? (
                <button onClick={() => handleDeletePledge(pledgeData.id)}>
                  Delete
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>

  );
}

export default FundraiserPage;
