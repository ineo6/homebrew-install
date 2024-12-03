import React, { useState } from 'react';
import { Select, Tooltip, Checkbox } from 'antd';

const Option = Select.Option;

const CaskCard = ({ data }) => {
  const [terminalType, setTerminalType] = useState<string>('zsh');
  const [isJsonApi, setJsonApi] = useState<boolean>(true);

  return (
    <div className="__dumi-default-cask-card">
        {data.token}
    </div>
  );
};

export default CaskCard;
