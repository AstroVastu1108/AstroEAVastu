import UserAuthorization from "./app/(dashboard)/Authorization/authorization";
import ClientPage from "./app/(dashboard)/Client/client";
import DetailClient from "./app/(dashboard)/Client/detailClient/detailClient";
import MyCoursePage from "./app/(dashboard)/Courses/course";
import KundliPage from "./app/(dashboard)/kundli/kundli";
import PreviewPage from "./app/(dashboard)/kundli/preview/preview";
import Subscription from "./app/(dashboard)/Subscription/subscription";
import KundliTasksMain from "./app/(dashboard)/Tasks/kundliTasks";
import UserConfig from "./app/(dashboard)/userConfig/userConfig";

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
      path: "clientDetails",
      element: DetailClient,
    },
    {
      path: "taskPage",
      element: KundliTasksMain,
    },
    {
      path: "subscription",
      element: Subscription,
    }
  ];
