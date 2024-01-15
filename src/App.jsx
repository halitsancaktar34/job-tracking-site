import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JobList from './pages/JobList'
import AddJob from './pages/AddJob'
import Header from './components/Header'

const Job = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<JobList />}></Route>
        <Route path='/add' element={<AddJob />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Job 