import { Outlet } from "react-router-dom";
import './Layout.css'
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/TopBar";
import MobinaChat from "../pages/mobina/chat/MobinaChat";

export default function Layout() {
   return (
      <>
          <Sidebar />
          <main className="flex">
               <Topbar />
               <MobinaChat />
          </main>
      </>
   );
}
