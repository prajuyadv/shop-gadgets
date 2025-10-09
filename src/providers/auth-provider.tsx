import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, SetUser] = useState(null);
  const [mounting, setMounting] = useState(true);

  type AuthData = {
    session: Session | null;
    mounting: boolean;
    user: any;
  };

  const AuthContext = createContext<AuthData>({
    session: null,
    mounting: true,
    user: null,
  });

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id, session.user.id")
          .single();

        if (error) {
          console.log("error", error);
        } else {
          SetUser(user);
        }
      }
      setMounting(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={{session, mounting, user}}>{children}</AuthContext.Provider>;
}
