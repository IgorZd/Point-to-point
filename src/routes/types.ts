import { Dispatch, SetStateAction } from 'react';
import { View } from './routeInterfaces';

type Route = {
  route: View;
  key: number;
};

export interface RoutesData {
  nextKey: number;
  list: Route[];
}

export type RoutesFunctions = {
  requestPush: any;
  removeRequest: any;
};

export type RoutesContextProviderType = [RoutesData, Dispatch<SetStateAction<RoutesData>> | null, RoutesFunctions];
