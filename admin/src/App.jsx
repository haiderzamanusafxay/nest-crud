import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
// import { layoutTypes } from "./constants/layout";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes/index.jsx";

// Import all middleware
import Authmiddleware from "./routes/route.jsx";

// layouts Format
// import VerticalLayout from "./components/VerticalLayout/";
// import HorizontalLayout from "./components/HorizontalLayout/";
// import NonAuthLayout from "./components/NonAuthLayout";

// const getLayout = (layoutType) => {
//   let Layout = VerticalLayout;
//   switch (layoutType) {
//     case layoutTypes.VERTICAL:
//       Layout = VerticalLayout;
//       break;
//     case layoutTypes.HORIZONTAL:
//       Layout = HorizontalLayout;
//       break;
//     default:
//       break;
//   }
//   return Layout;
// };

const App = () => {
  // const { layoutType } = useSelector((state) => ({
  //   layoutType: state.Layout.layoutType,
  // }));

  // const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {/* {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))} */}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware path={route.path}>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

export default App;
