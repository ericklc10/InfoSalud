import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import HospitalItaliano from "./pages/Hospitales/Italiano/HospitalItaliano";
import HospitalFavaloro from "./pages/Hospitales/Favaloro/HospitalFavaloro";
import HospitalGarrahan from "./pages/Hospitales/Garrahan/HospitalGarrahan";
import HospitalAleman from "./pages/Hospitales/Aleman/HospitalAleman";
import ScrollToTop from "./components/ScrollToTop";
import Registro from "./pages/login/Registro";
import Login from "./pages/login/Login";
import RegistroHospital from "./pages/login/RegistroHospital";
import HospitalPublico from "./pages/HospitalPublico";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro-hospital" element={<RegistroHospital />} />

            {/* Hospitales visibles sin autenticación */}
            <Route path="/hospital/italiano" element={<HospitalItaliano />} />
            <Route path="/hospital/favaloro" element={<HospitalFavaloro />} />
            <Route path="/hospital/garrahan" element={<HospitalGarrahan />} />
            <Route path="/hospital/aleman" element={<HospitalAleman />} />
            <Route path="/hospital/:id" element={<HospitalPublico />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
