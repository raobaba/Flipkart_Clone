import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Cart from "./Components/Cart/Cart.jsx"
import DetailsView from './Components/Details/DetailsView.jsx';
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <Box style={{ marginTop: 54 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<DetailsView />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
