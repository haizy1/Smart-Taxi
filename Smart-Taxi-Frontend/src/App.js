// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// // import './App.css'
// import Test from "./pages/Test/Test";
// import Texi from "./pages/Taxi/Taxi"
// import { Dashboard, DashboardC , HomeLayout, Landing, Login, Logout, Register, RegisterDriver } from "./pages";

// function App() {
  
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path='/client' element={<Test />} />
//           <Route path='/taxi' element={<Texi />} />
//           <Route path='/dashboard' element={<Dashboard />} />
//           <Route path='/dashboerdc' element={<DashboardC />} />
//           <Route path='/' element={<HomeLayout />} />
//           <Route path='/landing' element={<Landing />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/logout' element={<Logout />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/registerdriver' element={<RegisterDriver />} />

//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import './App.css'
import Test from "./pages/Test/Test";
import Texi from "./pages/Taxi/Taxi"
import { Dashboard, DashboardC , HomeLayout,Landing, Login, Logout, Register, RegisterDriver } from "./pages";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/client' element={<Test />} />
          <Route path='/taxi' element={<Texi />} />
          <Route path='/dashboard' element={<Test />} />
          <Route path='/dashboardc' element={<Texi />} />
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<Landing />} />
          </Route>
          <Route path='/landing' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/registerdriver' element={<RegisterDriver />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center'/>
    </div>
  );
}

export default App;

