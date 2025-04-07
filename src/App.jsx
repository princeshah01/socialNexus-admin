import React, { Suspense  , useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
const Loader = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark"); 
  }, []);
  return (
    <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
