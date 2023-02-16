import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// pages
import LoginPage from './Pages/LoginPage/LoginPage';
import { setLoginUser } from './App/Features/Auth/authSlice';

function App() {
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const navigation = useNavigate();

   useEffect(() => {
      if (cookie && cookie?._bc_games_auth) {
         dispatch(setLoginUser({ auth: cookie?._bc_games_auth }));
      } else {
         navigation('/dashboard/auth/login');
      }
   }, []);

   return (
      <div className="App">
         <Routes>
            <Route path="/dashboard/auth/login" element={<LoginPage />} />
         </Routes>
      </div>
   );
}

export default App;
