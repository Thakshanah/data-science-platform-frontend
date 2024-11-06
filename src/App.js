// import React, { useState, useEffect } from 'react';
// import './App.css';
// import HomePage from './components/HomePage';
// import Leaderboard from './components/Leaderboard';
// import NavigationBar from './components/NavigationBar';
// import TeacherDashboard from './components/TeacherDashboard';
// import TeacherDashboard2 from './components/TeacherDashboard2';
// import TaskManagement from './components/TaskManagement';
// import Tutorial from './components/Tutorial';
// import LoginPage from './components/LoginPage'; // Import LoginPage
// import SignupPage from './components/SignupPage'; // Import SignupPage
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import axios from 'axios';



// function App() {

//   const [user, setUser] = useState(null); // State to store logged-in user information

//   const navigate = useNavigate();

//   // Check if user is logged in (example: you can store the logged-in state in local storage)
//   useEffect(() => {
//     const loggedInUser = localStorage.getItem('user');
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData)); // Store user in local storage
//     navigate('/'); // Redirect to homepage on login
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true })
//       .then(() => {
//         navigate('/login');
//       });
//   };


//   return (
//     <>
//       <NavigationBar user={user} onLogout={handleLogout}/>
//       {/* <Navbar bg="light" expand="lg">
//         <Navbar.Brand className="mx-auto" href="#home">My Game</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Link className="nav-link" to="/">Home</Link>
//             <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar> */}
//       <Routes>
//       <Route exact path="/" element={<HomePage user={user} />} />
//         <Route exact path="/leaderboard" element={<Leaderboard />} />
//         <Route exact path="/Teacherdashboard" element={<TeacherDashboard />} />
//         <Route exact path="/Teacherdashboard2" element={<TeacherDashboard2 />} />
//         <Route exact path="/TaskManagement" element={<TaskManagement />} />
//         <Route exact path="/Tutorial" element={<Tutorial />} />
//         <Route exact path="/login" element={<LoginPage onLogin={handleLogin} />} />
//         <Route exact path="/signup" element={<SignupPage />} />
//       </Routes>
//     </>
//   );
// }

// export default App


// // function App() {
// //   return (
     
// //       <Routes>
// //         <Route exact path="/" element={<HomePage/>} />
// //       </Routes>
   
// //   );
// // }

import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Leaderboard from './components/Leaderboard';
import NavigationBar from './components/NavigationBar';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherDashboard2 from './components/TeacherDashboard2';
import TaskManagement from './components/TaskManagement';
import Tutorial from './components/Tutorial';
import LoginPage from './components/LoginPage'; // Import LoginPage
import SignupPage from './components/SignupPage'; // Import SignupPage
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';



function App() {

  const [user, setUser] = useState(null); // State to store logged-in user information

  const navigate = useNavigate();

  // Check if user is logged in (example: you can store the logged-in state in local storage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in local storage
    navigate('/'); // Redirect to homepage on login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true })
      .then(() => {
        navigate('/login');
      });
  };


  return (
    <>
      <NavigationBar user={user} onLogout={handleLogout}/>
      {/* <Navbar bg="light" expand="lg">
        <Navbar.Brand className="mx-auto" href="#home">My Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
      <Routes>
      <Route exact path="/" element={<HomePage user={user} />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/Teacherdashboard" element={<TeacherDashboard />} />
        <Route exact path="/Teacherdashboard2" element={<TeacherDashboard2 />} />
        <Route exact path="/TaskManagement" element={<TaskManagement />} />
        <Route exact path="/Tutorial" element={<Tutorial />} />
        <Route exact path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route exact path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App


// function App() {
//   return (
     
//       <Routes>
//         <Route exact path="/" element={<HomePage/>} />
//       </Routes>
   
//   );
// }

