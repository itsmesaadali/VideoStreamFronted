import "./App.css";
import {AppLayout} from './components/Layout/AppLayout'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage/> }/>
          <Route path="/register" element={<RegisterPage/> }/>
        <Route path="/" element={<AppLayout/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

