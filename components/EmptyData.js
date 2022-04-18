import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
const EmptyData = (props) => {
  return (
    <div>
      <CopyOutlined />
      <p>No Data</p>
    </div>
  );
};

export default EmptyData;
