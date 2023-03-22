import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Settings, Signup, UserProfile } from "../pages";
import { Loader, Navbar } from "./";

// const PrivateRoute = ({ children, ...rest }) => {
//   const auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       Render={() => {
//         if (auth.user) {
//           return children;
//         }

//         return <Navigate to="/login" replace />;
//       }}
//     />
//   );
// };

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/user/:userId" element={<UserProfile />} />
          {/* <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute> */}

          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
