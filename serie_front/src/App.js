import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import UserProvider from "./Provider/UserProvider";
import SeriesProvider from "./Provider/SeriesProvider";

function App() {
  return (
    <div className="d-flex flex-column mh100">
      <UserProvider>
        <SeriesProvider>
          <Header />
          <Suspense >
            <Outlet/>
          </Suspense>
          <Footer />
        </SeriesProvider>
      </UserProvider>
    </div>
  );
}

export default App;
