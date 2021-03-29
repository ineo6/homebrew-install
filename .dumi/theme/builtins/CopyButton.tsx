import React from 'react';
import { useCopy } from 'dumi/theme';
import './CopyButton.less';

export default (props: { content: string }) => {
  const { content } = props;
  const [copyCode, copyStatus] = useCopy();

  return (
    <button
      className="__dumi-default-icon my-code-block-copy-btn"
      role="copy"
      data-status={copyStatus}
      onClick={() => copyCode(content)}
    />
  );
};
