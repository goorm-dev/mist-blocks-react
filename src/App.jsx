import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import FullstackDetail from './pages/FullstackDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fullstack" element={<FullstackDetail />} />
    </Routes>
  )
}

export default App
