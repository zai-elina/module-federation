import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const App: FC = () => {
  return (
    <div>
      <h1>Header</h1>
      <Link to="/about">about</Link>
      <br />
      <Link to="/shop">shop</Link>
      <Outlet />
    </div>
  );
};
