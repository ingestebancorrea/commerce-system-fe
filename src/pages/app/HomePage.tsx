import { useEffect, useState } from "react";
import { AppLayout } from "../../layout/app/AppLayout";
import { Loader } from "../../components/app/Loader";
import { useAppSelector } from '../../store/hooks';
import { ClientPage } from "../client/ClientPage";
import { AdminPage } from "../admin/AdminPage";

export const HomePage = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { rol } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <Loader />;
  }

  return (
    <AppLayout>
      {
        rol?.toLowerCase() === "client"
        ? (<ClientPage/>) 
        : (<AdminPage/>)
      }
    </AppLayout>
  );
};
