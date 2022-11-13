import { NavLinkProps as NavLinkPropsRRD } from 'react-router-dom';
//import { Access } from '../app/state/userInterfaces';

export interface NavLinkProps extends NavLinkPropsRRD {
  access: any[];
}

export const defaultAccess = ['permission'];
