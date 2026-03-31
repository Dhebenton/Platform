import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { AppProvider } from "./context/AppContext";
import "./App.css";
import Layout from "./layout/Layout";

import './css/Flex.css' 
import './css/Colors.css' 
import './css/Font.css' 

import "./Unorganised.css";

const MobinaChat = lazy(
   () => import("./pages/mobina/mobina-chat/MobinaChat"),
);

function App() {
   const [session, setSession] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
         supabase.auth
            .setSession({ access_token, refresh_token })
            .then(({ data }) => {
               setSession(data.session);
               setLoading(false);
               window.history.replaceState({}, "", "/");
            });
      } else {
         supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
         });
      }

      supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session);
      });
   }, []);

   useEffect(() => {
      if (loading || !session) return;
      const main = document.querySelector("main");
      if (!main) return;
      const handleScroll = () => {
         const header = document.querySelector("header");
         if (!header) return;
         header.classList.toggle("scrolled", main.scrollTop > 0);
      };
      main.addEventListener("scroll", handleScroll);
      return () => main.removeEventListener("scroll", handleScroll);
   }, [loading, session]);

   if (loading) return null;

   if (!session) {
      window.location.href = "https://auth.hypeify.io";
      return null;
   }

   return (
      <Suspense fallback={null}>
         <Routes>
            <Route
               element={
                  <AppProvider session={session}>
                     <Layout />
                  </AppProvider>
               }
            >
               <Route path="/" element={<Navigate to="/mobina" replace />} />
               <Route path="/visibility" element={<MobinaChat />} />
               <Route path="/mobina" element={<MobinaChat />} />
               <Route path="/analytics" element={<MobinaChat />} />
            </Route>
         </Routes>
      </Suspense>
   );
}

export default App;
