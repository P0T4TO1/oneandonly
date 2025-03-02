import useSWR, { SWRConfiguration } from 'swr';
import { IUser } from '../interfaces';

export const useUser = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IUser[]>(`/api${url}`, config);

  return {
    usersData: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useProfile = (id: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IUser>(`/api/profile?_id=${id}`, config);

  return {
    userData: data || {},
    isLoading: !error && !data,
    isError: error,
  };
};
