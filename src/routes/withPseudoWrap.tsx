import React from 'react';
import { withRouter } from 'react-router-dom';

const withPseudoWrap = (Component: any) => {
  const PseudoComponent = (props: any) => {
    return <Component {...props} />;
  };
  return withRouter(PseudoComponent);
};
export default withPseudoWrap;
