import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<pages.HomePage />} />
        <Route path="/items" element={<pages.ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
