import { axios } from '../utils/request';

export function getMenu(): Promise<any> {
  return axios({
    url: '/menu',
    method: 'get',
  });
}

export function addMenu(data: any): Promise<any> {
  return axios({
    url: '/menu',
    method: 'post',
    data,
  });
}

export function updateMenu(id: string, data: any): Promise<any> {
  return axios({
    url: `/menu/${id}`,
    method: 'put',
    data,
  });
}

export function deleteMenu(id: string): Promise<any> {
  return axios({
    url: `/menu/${id}`,
    method: 'delete',
  });
}
