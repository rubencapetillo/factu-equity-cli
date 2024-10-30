import useSWR, { mutate } from 'swr';
import { axiosConfig } from "../config/axiosConfig";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line no-unused-vars
export const useAuth = ({middleware, url}) => {

  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();

  const { data: user, error } = useSWR('/api/user', () => 
    axiosConfig('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
    .catch(error => {
      throw Error(error?.response?.data?.errors)
    })
  );
  
  const hasRole = (roleName) => {
    return user?.roles?.some((role) => role.name === roleName);
  };

  const login = async (user, setErrors) => {
    try {
      const {data} = await axiosConfig.post('/api/login', user);
      localStorage.setItem('AUTH_TOKEN', data.token)
      setErrors([])
      await mutate()
    } catch(error) {
      setErrors(Object.values(error.response.data.errors))
    }

  }


  const register = async (newUser, setErrors) => {
    try {
      const {data} = await axiosConfig.post('/api/register', newUser);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrors([]);
      await mutate();
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
      await mutate(undefined)
    } catch (error) {
      throw Error(error?.response?.data?.errors)
    }

  }

  useEffect(() => {
    if(middleware === 'guest' && url && user) {
      navigate(url);
    }
    if(middleware === 'auth' && error) {
      navigate('/auth/login');
    }
  }, [user, error])
  


  return {
    login,
    register,
    logout,
    hasRole,
    user,
    error
  }
}