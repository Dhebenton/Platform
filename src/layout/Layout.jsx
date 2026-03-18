import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import './Layout.css'

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
