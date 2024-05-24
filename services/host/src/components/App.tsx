import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { shopRoutes, adminRoutes } from "@packages/shared";

export const App: FC = () => {
  return (
    <div>
      <h1>Header</h1>
      <Link to={adminRoutes.about}>about</Link>
      <br />
      <Link to={shopRoutes.main}>shop</Link>
      <Outlet />
    </div>
  );
};
