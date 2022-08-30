import { useSelector } from 'react-redux';
export const useRequestState = () => useSelector(state => state.request);
export const useUserState = () => useSelector((state) => state.users);
export const useAuthState = () => useSelector((state) => state.auth);
export const useAgentRegState = () => useSelector((state) => state.agentReg);
export const useNoticeState = () => useSelector((state) => state.notice);



 