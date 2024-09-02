import UserAuthorization from "./app/(dashboard)/Authorization/authorization";
import KundliPage from "./app/(dashboard)/kundli/kundli";
import PreviewPage from "./app/(dashboard)/kundli/preview/preview";

export const routes = [
    {
      path: "kundlipage",
      element: KundliPage,
    },
    {
      path: "preview",
      element: PreviewPage,
    },
    {
      path: "user",
      element: KundliPage,
    },
    {
      path: "permission",
      element: UserAuthorization,
    },
  ];