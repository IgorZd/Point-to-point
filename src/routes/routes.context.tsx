import React, { createContext, useState, useContext, ReactNode } from 'react';

//@TODO Alex - decide what to do with this context - this whole thing is WIP

import { BrowserRouter } from 'react-router-dom';
import { View } from './routeInterfaces';
import { RoutesData, RoutesContextProviderType, RoutesFunctions } from './types';

const DEFAULT_STATE = {
  nextKey: -1,
  list: [],
} as RoutesData;

const RoutesContext = createContext([DEFAULT_STATE, null as any, null as any] as RoutesContextProviderType);

const useRoutesContextCreator = (): RoutesContextProviderType => {
  const [routesState, setRoutesState] = useState(DEFAULT_STATE);

  const requestPush = (route: View) => {
    setRoutesState((value: any) => {
      const key = value.nextKey + 1;
      return { ...value, nextKey: key, list: [{ key, route }, ...value.list] };
    });
  };

  const removeRequest = (key: number) => {
    setRoutesState((value: any) => {
      const newList = value.list.filter((route: any) => route.key !== key);
      return { ...value, list: newList };
    });
  };

  const functions = {
    requestPush,
    removeRequest,
  };

  return [routesState, setRoutesState, functions];
};

export const RoutesContextProvider = ({ children }: { children: ReactNode }) => {
  const provider = useRoutesContextCreator();
  return (
    <BrowserRouter>
      <RoutesContext.Provider value={provider}>{children}</RoutesContext.Provider>
    </BrowserRouter>
  );
};

export const useRoutesContext = (): RoutesContextProviderType => {
  const service = useContext(RoutesContext);

  if (!service) {
    throw new Error('Routes Context is unavailable');
  }

  return service;
};

export const useRoutesFunctions = (): RoutesFunctions => {
  const service = useContext(RoutesContext);

  if (!service) {
    throw new Error('Routes Context is unavailable');
  }

  return service[2];
};

export const withRoutesContext = (Component: any) => {
  return function WithRoutesContext(props: any) {
    const service = useRoutesContext();
    return <Component {...props} routesContext={service} />;
  };
};
