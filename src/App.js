import { BrowserRouter, HashRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, ManageUser, Page404, PageAccount, Profile } from "./page";
import { Header, ToastContainer } from "./component";
import MqttComponent from "./page/mqtt";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, admin, status } = useContext(AuthContext)

  return (
    <div>
      <HashRouter>
        <Header />
        <ToastContainer />
        <div className="pt-20 h-screen">
          <Routes>
            <Route path="/" element={user ? (status ? <Home /> : <Navigate to='/account' />) : <Navigate to='/login' />} />
            <Route path="/profile" element={user ? (status ? <Profile /> : <Navigate to='/' />) : <Navigate to='/login' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="/account" element={user ? (status ? <Navigate to='/' /> : <PageAccount />) : <Navigate to='/login' />} />
            <Route path="/mqtt" element={<MqttComponent />} />
            {admin &&
              <Route path="/manage" element={<ManageUser />} />
            }
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
