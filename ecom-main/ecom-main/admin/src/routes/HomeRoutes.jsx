import LoginPage from "../pages/LoginPage";
import HomeNavigation from "../navigation/HomeNavigation";
import DashboardPage from "../pages/DashboardPage";
import OrderPage from "../pages/OrderPage";
import ProductPage from "../pages/ProductPage";
import ViewOrderPage from "../pages/ViewOrderPage";

export const homeRoutes = [
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/home/",
    element: <HomeNavigation />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "view/order/:orderId",
        element: <ViewOrderPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
    ],
  },
]