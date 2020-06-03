import { actions } from '../constants';
import { signInWithGoogle, signOut } from '../firebase';

const { LOGIN, LOGOUT } = actions;

export const login = (userDetails) => ({
  type: LOGIN,
  userDetails,
});

export const logout = () => ({
  type: LOGOUT,
});

export const initiateLogin = () => () => signInWithGoogle();

export const initiateLogout = () => () => signOut();
