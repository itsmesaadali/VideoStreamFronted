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
import EditProfilePage from "./pages/EditProfilePage";
import { Toaster } from "react-hot-toast"; // Import the Toaster component

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Add the Toaster component here */}
        <Toaster
          position="top-right"
          toastOptions={{
            // Define default options
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={ <PublicRoute> <LoginPage /> </PublicRoute> } />
          <Route path="/register" element={ <PublicRoute> <RegisterPage /> </PublicRoute> } />

          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> }/>
            <Route path="/profile/edit" element={ <ProtectedRoute> <EditProfilePage /> </ProtectedRoute> }/>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;