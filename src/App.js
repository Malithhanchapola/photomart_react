import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import Dashboard from "./pages/photographerPages/home/Dashboard";
import {Packages,Portfolios,PackagesForm , PortfolioForm , CalendarScreen , ContactsScreen , BookingScreen , ProfileScreen} from './components/photographerComponent';
import { Home } from './pages/userPages/pages'
import {Photographers,Booking , BookingForm , Profile , Signup} from './components/userComponent'
import MainPage from './pages/mainPage/MainPage';
import Login from './pages/login/Login';

import './app.css';

function App() {
  return (
   <div>
      <Router>
        <Routes>
          <Route  path = '/' element = {<MainPage/>}>
            <Route  path='home' element={<Home/>}/>
            <Route  path='profile' element={<Profile/>}/>
            <Route  path='findmore' element={<Photographers/>}/>
            <Route  path='booking/:id' element={<Booking/>}/>
            <Route  path='booking/:id/form' element={<BookingForm/>}/>
          </Route>
        </Routes>
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
        <Routes>
          <Route exact path='/photographer' element={<Dashboard/>} >
            <Route exact path='profile' element={<ProfileScreen/>}/>
            <Route exact path='bookings' element={<BookingScreen/>}/>
            <Route exact path='package' element={<Packages/>}/>
            <Route exact path='package/form' element={<PackagesForm/>}/>
            <Route exact path='portfolio' element={<Portfolios/>} />
            <Route exact path='portfolio/form' element={<PortfolioForm/>}/>
            <Route exact path='calendar' element={<CalendarScreen/>}/>
            <Route exact path='contacts' element={<ContactsScreen/>} />
          </Route>
        </Routes>
      </Router>
   </div>
  );
}

export default App;
