import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { API_CONFIG } from '../api/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      console.log('Login attempt with:', credentials);
      
      const response = await fetch(`${API_CONFIG.baseURL}/Authentication/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        // Handle validation errors
        let errorMessage = 'فشل تسجيل الدخول - تحقق من البيانات';
        
        if (data.errors) {
          // Extract error messages from validation errors
          const errorMessages = Object.values(data.errors).flat();
          errorMessage = errorMessages.join(', ');
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.title) {
          errorMessage = data.title;
        }
        
        return { 
          success: false, 
          message: errorMessage
        };
      }

      // Handle both 'success' and 'succeeded' response formats
      const isSuccess = data.success || data.succeeded;
      
      if (isSuccess && data.data) {
        const { token: authToken, ...userData } = data.data;
        
        if (!authToken) {
          return { success: false, message: 'لم يتم استلام التوكن من الخادم' };
        }
        
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        
        navigate('/admin');
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
