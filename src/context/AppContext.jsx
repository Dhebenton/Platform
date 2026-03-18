import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AppContext = createContext(null);

export const AppProvider = ({ session, children }) => {
   const [org, setOrg] = useState(null);
   const [site, setSite] = useState(null);

   useEffect(() => {
      if (!session) return;
      const load = async () => {
         const { data: memberData } = await supabase
            .from("organisation_members")
            .select("org_id, organisations(id, name)")
            .eq("user_id", session.user.id)
            .limit(1)
            .single();

         if (!memberData) return;
         setOrg(memberData.organisations);

         const { data: siteData } = await supabase
            .from("sites")
            .select("id, name, domain")
            .eq("org_id", memberData.org_id)
            .limit(1)
            .single();

         if (siteData) setSite(siteData);
      };
      load();
   }, [session]);

   return (
      <AppContext.Provider value={{ org, site, session }}>
         {children}
      </AppContext.Provider>
   );
};

export const useApp = () => useContext(AppContext);
