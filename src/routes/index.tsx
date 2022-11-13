import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PATHS, MAPPING, getPath } from './paths';
import { View } from './routeInterfaces';
import { RoutePusher } from './routePusher';
import { routes } from './routes';

export const RoutesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
      <RoutePusher />
    </BrowserRouter>
  );
};

export { PATHS, MAPPING, routes, getPath, View };
