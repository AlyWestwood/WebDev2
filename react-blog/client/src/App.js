import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home";
import NewEntry from './pages/NewEntry';

function App() {


  return (
    <div className='App'>
      <Router>
      <Link to="/">Home</Link>
      <Link to="/newentry">Create a blog entry</Link>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/newentry" element={<NewEntry/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
