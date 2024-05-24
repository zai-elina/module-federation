import { App } from "@/components/App";
import { Shop } from "@/pages";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: "/shop/main",
        element: (
          <Suspense fallback={"Загрузка..."}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shop/second",
        element: (
          <Suspense fallback={"Загрузка..."}>
            <div style={{ color: "green" }}>SECOND</div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
