import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Nqt from "./pages/Nqt";
import ProgramPage from "./pages/ProgramPage";
import Internship from "./pages/Internship";
import Research from "./pages/Research";
import Promotions from "./pages/Promotions";
import Design from "./pages/Design";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nqt" element={<Nqt />} />
        <Route path="/programs/:slug" element={<ProgramPage />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/research" element={<Research />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/design" element={<Design />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
