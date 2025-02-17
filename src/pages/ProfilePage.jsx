import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import config from "../../config";
import "../css/ProfilePage.css";

// Define the categories
const categories = ["Accessories", "Electronics", "Clothing", "Musical Instrument", "Other"];

function ProfilePage() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeToAll, setSubscribeToAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user preferences on mount
  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await fetch(`${config.API_URLS}/subscribe/${user.username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setSelectedCategories(data.preferredCategories || []);
        setIsSubscribed(data.isSubscribed || false);
        setSubscribeToAll(data.subscribeToAll || false);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, [user.username]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle "Subscribe to All" toggle
  const handleSubscribeToAllChange = () => {
    setSubscribeToAll(!subscribeToAll);
    if (!subscribeToAll) {
      setSelectedCategories([]); // Clear specific category selections
    }
  };

  // Handle Subscribe
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const subscribeResponse = await fetch(`${config.API_URLS}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.username,
          email: user.signInDetails.loginId,
          categories: subscribeToAll ? [] : selectedCategories,
          subscribeToAll,
        }),
      });

      if (!subscribeResponse.ok) {
        throw new Error(`HTTP error! Status: ${subscribeResponse.status}`);
      }

      setIsSubscribed(true);
      alert("Preferences saved and subscription updated!");
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Failed to save preferences. Please try again.");
    }
  };

  // Handle Unsubscribe
  const handleUnsubscribe = async () => {
    if (!window.confirm("Are you sure you want to unsubscribe? You will stop receiving notifications.")) {
      return;
    }

    try {
      const unsubscribeResponse = await fetch(`${config.API_URLS}/subscribe`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.username,
          email: user.signInDetails.loginId,
        }),
      });

      if (!unsubscribeResponse.ok) {
        throw new Error(`HTTP error! Status: ${unsubscribeResponse.status}`);
      }

      setIsSubscribed(false);
      setSelectedCategories([]);
      setSubscribeToAll(false);
      alert("You have successfully unsubscribed.");
    } catch (error) {
      console.error("Error unsubscribing:", error);
      alert("Failed to unsubscribe. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>Welcome, {user.signInDetails.loginId}!</p>
      <form onSubmit={handleSubmit}>
        <h2>Subscribe to Notifications</h2>

        {/* Subscribe to all checkbox */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={subscribeToAll}
            onChange={handleSubscribeToAllChange}
          />
          Subscribe to all notifications
        </label>

        {/* Category checkboxes (only show if not subscribing to all) */}
        {!subscribeToAll && (
          <>
            <p>Select categories youre interested in:</p>
            {categories.map((category) => (
              <label key={category} style={{ display: "block", margin: "5px 0" }}>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </>
        )}

        <button type="submit" disabled={isSubscribed}>
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </form>

      {/* Unsubscribe Button */}
      <button
        onClick={handleUnsubscribe}
        style={{
          marginTop: "10px",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Unsubscribe
      </button>
    </div>
  );
}

export default ProfilePage;