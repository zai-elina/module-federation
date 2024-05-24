import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const App: FC = () => {
  return (
    <div>
      <h1>ADMIN</h1>
      <Outlet />
    </div>
  );
};
