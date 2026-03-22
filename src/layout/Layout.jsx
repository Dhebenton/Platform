import { Outlet } from "react-router-dom";
import './Layout.css'
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";

export default function Layout() {
   return (
      <>
          <Sidebar />
         <main>
               <Topbar />
               <Outlet />
         </main>
      </>
   );
}
