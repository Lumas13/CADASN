import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';
import "../css/ClaimPage.css";


function ClaimPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState  (true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${config.API_URLS}/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error("Failed to fetch item details: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleConfirmPickup = async () => {
    try {
      const response = await fetch(`${config.API_URLS}/items/${id}/claim`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Pickup confirmed!');
      window.location.href = '/'; 
    } catch (error) {
      console.error("Error confirming pickup:", error);
      alert('Failed to confirm pickup. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
<div className="claim-page">
  <div className="claim-card">
    <h1>Claim</h1>
    <h2 className="claim-name">{item.itemName}</h2>
    <div className="claim-image">
      <img src={item.imageUrl} alt={item.itemName} />
    </div>
    <button className="claim-btn" onClick={handleConfirmPickup}>
      Confirm Claim
    </button>
  </div>
</div>
  );
}

export default ClaimPage;