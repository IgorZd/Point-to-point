import { GeneralView } from "../enums/View";

export const View = {
  ...GeneralView,
};

export type View = typeof View;

export type CombinedRoutes = {
  [key in keyof View]: any;
};
