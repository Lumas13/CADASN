import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AddItemPage from "./pages/AddItemPage";
// import LoginPage from "./pages/LoginPage";
import ManageItemPage from "./pages/ManageItemPage"; 

function App() {
  // Check if a user is stored in localStorage and set state accordingly
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  // Handle logout and clear user from state and localStorage
  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("user");
  };

  // Manage user authentication via the Amplify Authenticator
  const { signOut, user: authUser } = useAuthenticator();

  // Update the user whenever the authentication state changes
  useEffect(() => {
    if (authUser) {
      setUser(authUser); // When user logs in, store the user in state and localStorage
      localStorage.setItem("user", JSON.stringify(authUser)); 
    }
  }, [authUser]);

  return (
    <Authenticator>
    <Router>
      {/* Header Section */}
      <header className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src="/logo-nyp.svg" alt="Logo" className="logo" />
          </Link>
          <nav>
            <ul>
              <li><Link to="/About">About Us</Link></li>
              {user && <li><Link to="/AddItem">Report Item</Link></li>}
              {user && <li><Link to="/ManageItems">Manage Items</Link></li>} 
            </ul>
          </nav>
        </div>
        <div className="navbar-right">
          <nav>
            <ul>
                <>
                  <li className="user-info">
                    Welcome, {user?.username}
                  </li>
                  <li>
                    <button className="logout-button" onClick={() => { signOut(); handleLogout(); }}>
                      Logout
                    </button>
                  </li>
                </>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<AboutUsPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route
            path="/AddItem"
            element={user ? <AddItemPage user={user} /> : <Navigate to="/Login" replace />}
          />
          {/* <Route path="/Login" element={<LoginPage setUser={setUser} />} /> */}
          <Route
            path="/ManageItems"
            element={user ? <ManageItemPage /> : <Navigate to="/Login" replace />}
          />
        </Routes>
      </main>
    </Router>
    </Authenticator>
  );
}

export default App;
