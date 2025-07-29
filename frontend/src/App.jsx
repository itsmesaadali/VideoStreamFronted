import "./App.css";
import {AppLayout} from './components/Layout/AppLayout'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProfilePage from "./pages/Profile";
import { Home } from "./pages/Home";

function App() {
  return (
        
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage/> }/>
          <Route path="/register" element={<RegisterPage/> }/>
        <Route path="/" element={<AppLayout/>}>
          <Route path="/profile" element={<ProfilePage/> }/>
          <Route path="/" element={<Home/> }/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

