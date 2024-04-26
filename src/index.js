import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home';
import ChangePassword from './changepassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AxiosDemo from './axiosdemo';
import MyProfile from './myprofile';
import About from './About'; 
import Contact from './Contact'; // Import the Contact component
import SevenDay from './SevenDay';



function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        <Route path='/about' element={<About />} />
        <Route path='/seven-days-weather' element={<SevenDay />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/axiosdemo' element={<AxiosDemo/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
      </Routes>
    </BrowserRouter>

    // <div className='full-height'>
    //   <Home/>
    //   <Login/>
    // </div>
  );
}

const logout = () => {
  // Implement logout logic here, such as clearing session or state
  // After logout, redirect to the login page
  window.location.replace("/login");
};

ReactDOM.render(<Website />, document.getElementById('root'));