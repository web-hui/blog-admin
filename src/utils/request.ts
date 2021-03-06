import axios from 'axios';
import { message } from 'antd';
import { getItem } from './localStorage';

const service = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 30000,
});

const err = (error: any) => {
  if (error.response) {
    let data = error.response.data;
    if (error.response.status === 403) {
      message.error(data.message);
    }
    if (error.response.status === 401) {
      message.error('授权验证失败');
      if (window.location.pathname !== '/login') {
        window.location.pathname = '/login';
      }
    }
  }
  if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    message.error('请求超时');
  }
  return Promise.reject(error);
};

service.interceptors.request.use((config) => {
  const token = getItem('SET_TOKEN');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, err);

service.interceptors.response.use((response) => {
  if (response.data.statusCode && response.data.statusCode !== '0') {
    message.error(response.data.message);
    return Promise.reject(response.data.message);
  }
  return response.data;
}, err);

export { service as axios };
