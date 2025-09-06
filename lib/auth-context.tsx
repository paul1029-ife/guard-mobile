import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: false,
  signIn: async () => ({ error: "Not implemented" }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - accept any email/password for demo
    if (email && password) {
      const mockUser: User = {
        id: "mock-user-id",
        email: email,
      };

      const mockSession: Session = {
        user: mockUser,
      };

      setSession(mockSession);
      setUser(mockUser);
      setLoading(false);
      return {};
    } else {
      setLoading(false);
      return { error: "Invalid credentials" };
    }
  };

  const signOut = async () => {
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
