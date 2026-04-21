import { RouterProvider } from "react-router";
import { router } from "./routes";
import MaintenancePage from "./MaintenancePage";
// import {fonts}from "./styles/fonts.css";

// تفعيل وضع الصيانة
const MAINTENANCE_MODE = true;

function App() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }
  
  return <RouterProvider router={router} />;
}

export default App;
