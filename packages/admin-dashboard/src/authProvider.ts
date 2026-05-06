import supabase from "../../../SupabaseClient";
import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {

    // login
    async login({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
 
    if (error) throw new Error(error.message);
 
    // Verify the user is an admin and not banned
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, is_banned")
      .eq("id", data.user.id)
      .single();
 
    if (profileError) throw new Error("Could not verify account. Please try again.");
 
    if (profile.is_banned) {
      await supabase.auth.signOut();
      throw new Error("This account has been suspended.");
    }
 
    if (profile.role !== "admin") {
      await supabase.auth.signOut();
      throw new Error("Access denied. Admin accounts only.");
    }
  },



  // logout
  async logout() {
    await supabase.auth.signOut();
  },


  // Check if session is still valid 
  async checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Authentication required");
  },

 
  // Handle API errors 
  async checkError({ status }: { status: number }) {
    if (status === 401 || status === 403) {
      await supabase.auth.signOut();
      throw new Error("Session expired. Please log in again.");
    }
  },

 
  // Expose the user's role to react-admin 
  async getPermissions() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
 
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
 
    return profile?.role ?? null;
  },

 
  // Populate the top-right user menu in react-admin 
  async getIdentity() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
 
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();
 
    return {
      id: user.id,
      fullName: profile?.full_name ?? user.email ?? "Admin",
      avatar: profile?.avatar_url ?? undefined,
    };
  },

};