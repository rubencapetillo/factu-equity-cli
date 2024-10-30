import useSWR, { mutate } from 'swr';
import { axiosConfig } from "../config/axiosConfig";
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line no-unused-vars
export const useAuth = ({middleware, url}) => {

  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();
  const hasNavigated = useRef(false);
  
  const { data: user, error } = useSWR('/api/user', () => 
    axiosConfig('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
    .catch(error => {
      throw Error(error?.response?.data?.errors)
    }), {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
  
  const hasRole = (roleName) => {
    return user?.roles?.some((role) => role.name === roleName);
  };

  const login = async (user, setErrors) => {
    try {
      const {data} = await axiosConfig.post('/api/login', user);
      localStorage.setItem('AUTH_TOKEN', data.token)
      setErrors([])
      await mutate('/api/user', data.user, { revalidate: false });
    } catch(error) {
      setErrors(Object.values(error.response.data.errors))
    }
  }

  const register = async (newUser, setErrors) => {
    try {
      const {data} = await axiosConfig.post('/api/register', newUser);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrors([]);
      await mutate('/api/user', data.user, { revalidate: false });
    } catch(error) {
      setErrors(Object.values(error.response.data.errors))
    }
  }

  const logout = async () => {
    try {
      await axiosConfig.post('/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('AUTH_TOKEN')
      await mutate('/api/user', null, { revalidate: false });
      navigate('/auth/login');
    } catch (error) {
      throw Error(error?.response?.data?.errors)
    }
  }

  useEffect(() => {
    if (hasNavigated.current) return;
    if(middleware === 'guest' && url && user) {
      hasNavigated.current = true;
      navigate(url);
    }
    if(middleware === 'auth' && error) {
      hasNavigated.current = true;
      navigate('/auth/login');
    }
  }, [user, error, middleware, url, navigate])
  
  return {
    login,
    register,
    logout,
    hasRole,
    user,
    error,
  }
}