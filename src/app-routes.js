import UserAuthorization from "./app/(dashboard)/Authorization/authorization";
import KundliPage from "./app/(dashboard)/kundli/kundli";
import PreviewPage from "./app/(dashboard)/kundli/preview/preview";
import UserConfig from "./app/(dashboard)/userConfig/userConfig";

export const routes = [
    {
      path: "kundlipage",
      element: KundliPage,
    },
    {
      path: "user",
      element: UserConfig,
    },
    {
      path: "preview",
      element: PreviewPage,
    },
    {
      path: "permission",
      element: UserAuthorization,
    }
  ];