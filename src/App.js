import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import MyRecipes from './Pages/MyRecipes';
import AllRecipies from './Pages/AllRecipies';
import SingleView from './Pages/SingleView';
import AboutUs from './Pages/AboutUs';
import AdminDashboed from './Pages/AdminDashboed';
import AllUsers from './Pages/AllUsers';
import Pnf from './Pnf';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/auth' element={<Auth users ></Auth>}></Route>
        <Route path='/adminLogin' element={<Auth admin></Auth>}></Route>

        <Route path='' element={<Home></Home>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/my-recipes' element={<MyRecipes></MyRecipes>}> </Route>
        <Route path='/aboutUs' element={<AboutUs></AboutUs>}></Route>
        <Route path='/all-recipies' element={<AllRecipies allRecipes></AllRecipies>}></Route>
        <Route path='/veg-recipes' element={<AllRecipies veg ></AllRecipies>}></Route>
        <Route path='/non-veg-recipes' element={<AllRecipies nonVeg></AllRecipies>}></Route>
        <Route path='/admin-dashbord' element={<AdminDashboed/>}></Route>
        <Route path='/all-recipes/single-view/:recipeId' element={<SingleView></SingleView>}></Route>
        <Route path='/all-users' element={<AllUsers></AllUsers>}></Route>
        <Route path='/*' element={<Pnf></Pnf>}></Route>

      </Routes>
    </div>
  );
}

export default App;
