import "./App.css";
import {AppLayout} from './components/Layout/AppLayout'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

