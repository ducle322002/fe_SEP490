import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import CreateAccount from './pages/admin/CreateAccount';

function App() {


  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createuser" element={<CreateAccount />} />
          <Route path="/dashbroad" element={<AdminDashboard />} />
        </Routes>
        </BrowserRouter>
      </div>      
    </>
  )
}

export default App
