import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './components/login';
import './App.css';
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
