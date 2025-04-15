import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import { ParticleBackground } from "./components/ParticleBackground";
import { Provider } from "react-redux";
import AppStore from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Loader = () => {
  return (
    <div>
      <h1 className="">Loading...</h1>
    </div>
  );
};

const App = () => {
  const client = new QueryClient();
  return (
    <Suspense fallback={<Loader />}>
      <>
        <QueryClientProvider client={client}>
          <Provider store={AppStore}>
            <ParticleBackground />

            <RouterProvider router={router} />
            <ToastContainer
              theme="dark"
              position="bottom-right"
              autoClose={3000}
            />
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </>
    </Suspense>
  );
};

export default App;
