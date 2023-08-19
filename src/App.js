import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Home, Profile } from "./page";
import { Header } from "./component";

function App() {
  return (
    <div>
      <HashRouter>
        <Header />
        <div className="pt-20 h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
