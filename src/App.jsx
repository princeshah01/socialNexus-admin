import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import { ParticleBackground } from "./components/ParticleBackground";
import { Provider } from "react-redux";
import AppStore from "./redux/store";
const Loader = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <>
        <Provider store={AppStore}>
          <ParticleBackground />

          <RouterProvider router={router} />
          <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={3000}
          />
        </Provider>
      </>
    </Suspense>
  );
};

export default App;
