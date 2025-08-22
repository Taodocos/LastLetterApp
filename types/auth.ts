export interface User {
  userId: string;
  username: string;
  authority: string;
  sessionId: string;
  Uname: string;
  phone: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  data: {
    response: {
      authority: string;
      sessionId: string;
      userId: string;
      Uname: string;
      phone: string;
    };
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
} 