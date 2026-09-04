import { BrowserRouter, Routes, Route } from "react-router-dom";

import Repositorio from "../Repositorio";
import Home from "../Home";

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
