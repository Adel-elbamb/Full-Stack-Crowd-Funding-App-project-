import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProject from "./pages/edit-project/edit-project";
import DeleteProject from "./pages/delete-project/delete-project";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/delete-project/:id" element={<DeleteProject />} />

      </Routes>
    </Router>
  );
}

export default App;
