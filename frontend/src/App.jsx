import "./App.css";
import { AppLayout } from "./components/Layout/AppLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProfilePage from "./pages/Profile";
import { Home } from "./pages/Home";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={ <PublicRoute> <LoginPage /> </PublicRoute> } />
          <Route path="/register" element={ <PublicRoute> <RegisterPage /> </PublicRoute> } />

          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />


            <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/>
          <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
