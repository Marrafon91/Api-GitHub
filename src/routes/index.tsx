import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Repositorio from "../pages/Repositorio";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositorio/:repositorio" element={<Repositorio />} />
      </Routes>
    </BrowserRouter>
  );
}
