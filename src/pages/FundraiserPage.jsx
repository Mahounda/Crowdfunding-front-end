import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import "./FundraiserPage.css";

function FundraiserPage() {
  const { id } = useParams();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("user_id"));
  const isSuperuser = localStorage.getItem("is_superuser") === "true";

  // Edit fundraiser
  const handleEditFundraiser = () => {
    navigate(`/fundraisers/${id}/edit`);
  };

  // Edit pledge
  const handleEditPledge = (pledgeId) => {
    navigate(`/pledges/${pledgeId}/edit`);
  };

  // Delete pledge
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

// Delete fundraiser
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
    <div>
      <h2>{fundraiser.title}</h2>
      <h3>Created at: {fundraiser.date_created}</h3>
      <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>

      <h3>Goal: ${fundraiser.goal}</h3>
      <h3>Total pledged: ${totalPledged}</h3>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Owner can edit fundraiser */}
      {fundraiser.owner === userId && (
        <button onClick={handleEditFundraiser}>Edit Fundraiser</button>
      )}

      {/* Superuser can delete fundraiser */}
      {isSuperuser && (
        <button onClick={handleDeleteFundraiser}>Delete Fundraiser</button>
      )}

      <h3>Pledges:</h3>
      <ul>
        {fundraiser.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}

              {/* Supporter can edit/delete their own pledge */}
              {pledgeData.supporter === userId && fundraiser.is_open && (
                <>
                  <button onClick={() => handleEditPledge(pledgeData.id)}>
                    Edit
                  </button>

                  <button onClick={() => handleDeletePledge(pledgeData.id)}>
                    Delete
                  </button>
                </>
              )}

              {/* Superuser override */}
              {isSuperuser && (
                <button onClick={() => handleDeletePledge(pledgeData.id)}>
                  Admin Delete
                </button>
               )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FundraiserPage;

