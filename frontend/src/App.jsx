import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import IsMobileContext from "./components/context/IsMobileContext";

function App() {
  return (
    <>
      <header>
        <IsMobileContext>
          <Header />
        </IsMobileContext>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
