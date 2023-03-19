import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
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
          <Route path="product/:id" element={<DetailsView />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
