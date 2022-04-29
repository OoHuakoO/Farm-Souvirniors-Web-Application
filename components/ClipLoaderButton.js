import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0px;
`;
const ClipLoaderButton = ({ loading, color }) => {
  return (
    
    <ClipLoader color={color} loading={loading} size={20} css={override} />
  );
};
export default ClipLoaderButton;
