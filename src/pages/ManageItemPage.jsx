import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import config from "../../config";
import "../css/ManageItemPage.css";

function ManageItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [currentQRCodeUrl, setCurrentQRCodeUrl] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${config.API_URLS}/items`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.items);
        } else {
          console.error("Failed to fetch items");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Update item details
  const handleUpdate = async (id, updates) => {
    try {
      const response = await fetch(`${config.API_URLS}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setItems(
          items.map((item) =>
            item.itemId === id ? { ...item, ...updates } : item
          )
        );
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    try {
      const response = await fetch(`${config.API_URLS}/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setItems(items.filter((item) => item.itemId !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save edits to the item
  const saveEdit = async () => {
    const { itemId, itemName, description, location, status, category, claim } =
      currentEdit;
    const updates = { itemName, description, location, status, category, claim };

    await handleUpdate(itemId, updates);

    setIsEditing(false);
    setCurrentEdit(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle QR code generation
  const handleGenerateQRCode = (itemId) => {
    const qrCodeUrl = `${config.AMPLIFY_URL}/claim/${itemId}`;
    setCurrentQRCodeUrl(qrCodeUrl);
    setShowQRCodeModal(true);
  };

  return (
    <div className="manage-items-page">
      <h1>Manage Items</h1>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Status</th>
                <th>Category</th>
                <th>claim</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemName}</td>
                  <td>{item.description}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>{item.category}</td>
                  <td>{item.claim}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setCurrentEdit(item);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.itemId)}>
                      Delete
                    </button>
                    <button onClick={() => handleGenerateQRCode(item.itemId)}>
                      Generate QR Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="arrow"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &#8592;
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={currentPage === page + 1 ? "active" : ""}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="arrow"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &#8594;
            </button>
          </div>
        </>
      )}

      {isEditing && currentEdit && (
        <div className="edit-modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
          >
            <label>
              Item Name:
              <input
                type="text"
                name="itemName"
                value={currentEdit.itemName || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={currentEdit.description || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={currentEdit.location || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={currentEdit.status || ""}
                onChange={handleInputChange}
                required
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCodeModal && (
        <div className="qr-code-modal">
          <div className="qr-code-content">
            <h2>Scan QR Code for Pickup</h2>
            <QRCode value={currentQRCodeUrl} size={256} />
            <button onClick={() => setShowQRCodeModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageItemsPage;