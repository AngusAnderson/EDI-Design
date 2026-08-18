import { Route, Routes } from "react-router";

import { HomePage } from "./pages/homePage";
import { BeyondEarthPage } from "./pages/beyondEarthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/beyond-earth" element={<BeyondEarthPage />} />
    </Routes>
  );
}

export default App;