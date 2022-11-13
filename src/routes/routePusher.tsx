import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoutesList, removeRequest as removeRequestReducer } from '../app/state/routesSlice';
import { useCustomHistory } from '../utils/react-router-dom-abstraction';

export const RoutePusher = () => {
  const [routeList, setRouteList] = useState<any[]>([]);
  const routes = useSelector(selectRoutesList);
  // use this if context version is needed
  //const [{ list: routes }] = useRoutesContext();
  const history = useCustomHistory();
  const dispatch = useDispatch();
  console.log(routes);
  const removeRequest = (key: number) => {
    dispatch(removeRequestReducer(key));
  };
  // use this if context version is needed
  //const { removeRequest } = useRoutesFunctions();
  useEffect(() => {
    routes.forEach((route: any) => {
      // If route already being awaited, abort
      if (routeList.filter((key) => key === route.key).length > 0) {
        return;
      }

      // Push route to history
      history.push(route.route);

      // Add routes's key to the local state
      setRouteList((rl: any[]) => [...rl, route.key]);

      // Dispatch action to remove the notification from the redux store
      removeRequest && removeRequest(route.key);
    });
  }, [routes, routeList]);

  return null;
};
