import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components/app/Loader";
import { AuthRoutes } from "./auth/AuthRoutes";
import { logout, revalidateToken } from "../store/auth/authSlice";
import { useFetchData } from "../hooks/useFecthData";
import { HomeRoutes } from "./home/HomeRoutes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RenewTokenResponse } from "../interfaces/auth/auth.interfaces";

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const { fetchData, data: response, isLoading } = useFetchData<RenewTokenResponse>();

  useEffect(() => {
    const renewToken = async () => {
      await fetchData('/auth/renew');
    };
    renewToken();
  }, []);

  useEffect(() => {
    if (response) {
      localStorage.setItem('token', response.token);
      dispatch(revalidateToken({
        id: response.user.id,
        name: response.user.name,
        token: response.token,
        rol: response.user.role
      }));
    } else if (!isLoading && !response) {
      dispatch(logout({}));
    }
  }, [response, isLoading]);

  if (status === 'checking') {
    return <Loader />
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="/*" element={<Navigate to='/auth/login' />} />
            </>
          )
          : (
            <>
              <Route path="/home/*" element={<HomeRoutes />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          )
      }
    </Routes>
  )
}