import React from "react";

import { withRouter } from "react-router-dom";
import { PATHS } from "../routes/paths";

const DefaultPage = ({ history }: { history: any }) => {
  history.push(PATHS.MAIN);

  return <></>;
};

export default withRouter(DefaultPage);
