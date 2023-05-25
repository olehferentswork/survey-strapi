import {Route, Routes} from "react-router-dom";
import Home from "./views/Home.tsx";
import Admin from "./views/Admin.tsx";
import Header from "./components/Header.tsx";
import Login from "./views/Login.tsx";


function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </>
  )
}

export default App
