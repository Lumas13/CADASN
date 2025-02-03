import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AddItemPage from "./pages/AddItemPage";
import ManageItemPage from "./pages/ManageItemPage"; 
import Profilepage from "./pages/ProfilePage";

function App() {
  // Call and set the user
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  //console.log(user?.signInDetails.loginId)
  //console.log(user?.emailaddress);

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
              {user && <li><Link to="/Profile">Profile</Link></li>}
            </ul>
          </nav>
        </div>
        <div className="navbar-right">
          <nav>
            <ul>
                <>
                  <li className="user-info">
                    Welcome, {user?.signInDetails.loginId}
                  </li>
                  <li>
                    <button className="logout-button" onClick={ signOut }>
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
          <Route path="/AddItem" element={<AddItemPage/>} />
          <Route path="/ManageItems"element={<ManageItemPage/>}/>
          <Route path="/Profile"element={<Profilepage/>}/>
        </Routes>
      </main>
    </Router>
    </Authenticator>
  );
}

export default App;
