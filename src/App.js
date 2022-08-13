import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";

import "./assets/css/reset.css";
import "./assets/css/style.css";
import ProductionPage from "./pages/ProductionPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/production/:id" element={<ProductionPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
