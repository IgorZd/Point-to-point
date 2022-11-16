import { Destination } from "../containers/destination/Destination";
import { Main } from "../containers/main/Main";
import DefaultPage from "./DefaultPage";
import { PATHS } from "./paths";

export const routes = [
  {
    path: PATHS.DESTINATION,
    component: Destination,
  },
  {
    path: PATHS.MAIN,
    component: Main,
  },
  { path: PATHS.REDIRECT, component: DefaultPage },
];
