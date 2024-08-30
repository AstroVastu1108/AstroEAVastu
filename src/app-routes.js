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
  ];
