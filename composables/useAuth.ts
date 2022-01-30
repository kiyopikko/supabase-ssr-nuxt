import { Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const nuxtApp = useNuxtApp();

  const currentSession = ref<Session>(null);

  const session = nuxtApp.$supabase.auth.session();
  if (session) {
    currentSession.value = session;
  }

  nuxtApp.$supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      currentSession.value = session;
    }
  });

  return {
    currentSession,
  };
};
