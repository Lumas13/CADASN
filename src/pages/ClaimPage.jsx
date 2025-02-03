import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config';

function ClaimPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${config.API_URLS}/items/${itemId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleConfirmPickup = async () => {
    try {
      const response = await fetch(`${config.API_URLS}/items/${itemId}/claim`, {
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
    <div>
      <h1>Confirm Pickup</h1>
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <img src={item.imageUrl} alt={item.itemName} />
      <button onClick={handleConfirmPickup}>Confirm Pickup</button>
    </div>
  );
}

export default ClaimPage;