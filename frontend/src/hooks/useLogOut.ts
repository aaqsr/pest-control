import { useAuthContext } from "./useAuthContext";
import { useBugsContext } from "./useBugsContext";

export const useLogOut = () => {
    const { dispatch: authDispatch }: any = useAuthContext();
    const { dispatch: bugsDispatch }: any = useBugsContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        authDispatch({ type: 'LOGOUT' });
        bugsDispatch({ type: 'SET_BUG', payload: null });
    }

    return { logout };
}