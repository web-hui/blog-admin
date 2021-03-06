import { axios } from '../utils/request';

export function login(data: any): Promise<any> {
  return axios({
    url: '/login',
    method: 'post',
    data,
  });
}

export function getCurrentUserInfo(): Promise<any> {
  return axios({
    url: '/user/getUserInfo',
    method: 'get',
  });
}

export function getUserList(params: any): Promise<any> {
  return axios({
    url: '/user',
    method: 'get',
    params,
  });
}

export function addUser(data: any): Promise<any> {
  return axios({
    url: '/user',
    method: 'post',
    data,
  });
}

export function changeUser(id: string, data: any): Promise<any> {
  return axios({
    url: `/user/${id}`,
    method: 'put',
    data,
  });
}

export function deleteUser(id: string): Promise<any> {
  return axios({
    url: `/user/${id}`,
    method: 'delete',
  });
}
