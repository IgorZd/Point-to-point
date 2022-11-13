import { MouseEvent } from 'react';
import { useHistory as useHistoryRRD, NavLink as NavLinkRRD } from 'react-router-dom';
import { NavLinkProps } from './react-router-dom-interfaces';
import { getPath, injectPathParams } from '../routes/paths';
import { View } from '../routes/routeInterfaces';

export const useHistory = () => {
  const history = useHistoryRRD();
  const handlePush = (path: string, state?: any) => {
    if (!state) return;
    const { ...newState } = state;
    history.push(path, newState);
  };
  const handleReplace = (path: string, state?: any) => {
    if (!state) return;
    const { ...newState } = state;

    history.replace(path, newState);
  };
  const resultHistory = { ...history, push: handlePush, replace: handleReplace };
  return resultHistory;
};

export const useCustomHistory = () => {
  const history = useHistoryRRD();
  const handlePush = (view: typeof View[keyof typeof View], state?: any) => {
    let path = getPath(view);
    if (state) {
      const { pathParams } = state;
      if (pathParams) {
        path = injectPathParams(path, pathParams);
        delete state.pathParams;
      }
    }
    history.push(path, state);
  };
  const handleReplace = (view: typeof View[keyof typeof View], state?: any) => {
    let path = getPath(view);
    if (state) {
      const { pathParams } = state;
      if (pathParams) {
        path = injectPathParams(path, pathParams);
        delete state.pathParams;
      }
    }
    history.replace(path, state);
  };
  const resultHistory = { ...history, push: handlePush, replace: handleReplace };
  return resultHistory;
};

export const NavLink = ({ children, onClick, ...props }: NavLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick(e);
  };
  return (
    <NavLinkRRD {...props} onClick={handleClick}>
      {children}
    </NavLinkRRD>
  );
};
