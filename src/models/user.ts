import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import {
  login,
  getCurrentUserInfo,
  getUserList,
  addUser,
  changeUser,
  deleteUser,
} from '../services/user';
import { setItem } from '../utils/localStorage';
import { message } from 'antd';

export interface user {
  username: string;
  password: string;
  remember: boolean;
}

export interface initState {
  userInfo: any;
  userList: any[];
  query: any;
  total: number;
}

const initialState: initState = {
  userInfo: {},
  userList: [],
  query: {
    username: '',
    pageSize: 10,
    currentPage: 1,
  },
  total: 2,
};

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      state.userInfo = { ...payload };
    },
    saveUserList: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      state.userList = [...payload];
    },
    saveQuery: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      state.query = { ...payload };
    },
    saveTotal: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      console.log(payload);
      state.total = payload;
    },
  },
});

export default userStore.reducer;

// Actions
export const {
  saveUser,
  saveUserList,
  saveQuery,
  saveTotal,
} = userStore.actions;

export function userLogin(user: user) {
  return async (dispatch: Dispatch) => {
    login(user).then((res) => {
      setItem('SET_TOKEN', res.token);
      getCurrentUserInfo().then((data) => {
        console.log(data);
        dispatch(saveUser(data.data));
      });
      window.location.replace('/');
    });
  };
}

export function userList(params: any = initialState.query) {
  return async (dispatch: Dispatch) => {
    getUserList(params).then((res) => {
      dispatch(saveUserList(res.data));
      dispatch(saveTotal(res.pagination.total));
    });
  };
}

export function addUserModel(user: any) {
  return async (dispatch: Dispatch<any>) => {
    addUser(user).then(() => {
      message.success('新增用户成功');
      dispatch(saveQuery(initialState.query));
    });
  };
}

export function changeUserModel(id: string, user: any) {
  return async (dispatch: Dispatch<any>) => {
    changeUser(id, user).then(() => {
      message.success('修改用户成功');
      dispatch(saveQuery(initialState.query));
    });
  };
}

export function deleteUserModel(id: string) {
  return async (dispatch: Dispatch<any>) => {
    deleteUser(id).then(() => {
      message.success('删除用户成功');
      dispatch(saveQuery(initialState.query));
    });
  };
}
