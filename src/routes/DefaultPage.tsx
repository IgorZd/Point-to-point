import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import { PATHS } from "../routes/paths";

const DefaultPage = ({ history }: { history: any }) => {
  useEffect(() => {
    history.push(PATHS.MAIN);
  }, []);
  return <></>;
};

export default withRouter(DefaultPage);
