import UserAuthorization from "./app/(dashboard)/Authorization/authorization";
import MainSettings from "./app/(dashboard)/Settings/main-settings";
import ClientPage from "./app/(dashboard)/Client/client";
import DetailClient from "./app/(dashboard)/Client/detailClient/detailClient";
import MyCoursePage from "./app/(dashboard)/Courses/course";
import KundliPage from "./app/(dashboard)/kundli/kundli";
import PreviewPage from "./app/(dashboard)/kundli/preview/preview";
import Subscription from "./app/(dashboard)/Subscription/subscription";
import KundliTasksMain from "./app/(dashboard)/Tasks/kundliTasks";
import UserConfig from "./app/(dashboard)/userConfig/userConfig";
import Logout from "./views/Logout";
import TransitPage from "./app/(dashboard)/kundli/transit/transit";
import EventPage from "./app/(dashboard)/kundli/event/event";

export const routes = [
    {
      path: "kundali-list",
      element: KundliPage,
    },
    {
      path: "user",
      element: UserConfig,
    },
    {
      path: "kundali/:id",
      element: PreviewPage,
    },
    {
      path: "event/:id",
      element: EventPage,
    },
    {
      path: "transit/:id",
      element: TransitPage,
    },
    {
      path: "permission",
      element: UserAuthorization,
    },
    {
      path: "my-courses",
      element: MyCoursePage,
    },
    {
      path: "my-clients",
      element: ClientPage,
    },
    {
      path: "clientDetail/:id",
      element: DetailClient,
    },
    {
      path: "task-list",
      element: KundliTasksMain,
    },
    {
      path: "subscription",
      element: Subscription,
    },
    {
      path: "settings",
      element: MainSettings,
    },
    {
      path: "Logout",
      element: Logout,
    }
  ];
