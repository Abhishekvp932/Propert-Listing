import { Route,Routes } from 'react-router-dom'
import LoginPage from './pages/auth/Login/Login'
import SignupPage from './pages/auth/Signup/signup'
import HomePage from './pages/user/Home/Home'
import PropertyListPage from './pages/user/property/List'
import PropertyDetailPage from './pages/user/property/Details'
import SellPage from './pages/user/property/Sell'

function App() {
  return (
   <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path = '/list' element={<PropertyListPage/>}/>
    <Route path='/details-page/:id' element={<PropertyDetailPage/>}/>
    <Route path='/sell-page' element={<SellPage/>}/>
    {/* <Route path='/add-property' element = {<AddPropertyPage/>}/> */}
   </Routes>
  )
}

export default App