import React, { useContext, useState, useEffect } from 'react';
import './style/waimai.less';

interface WaimaiNoticeProps {}

const openWechatPage = () => {
  window.open('https://mp.weixin.qq.com/s/pvO1L48GmOkIhVu3PrdcOQ');
};

const WaimaiNotice: React.FC<WaimaiNoticeProps> = () => {
  return (
    <div className="__dumi-default-layout-waimai" onClick={openWechatPage}>
      <img
        className="__dumi-default-layout-waimai-banner"
        src="/images/waimai-banner.gif"
      />
    </div>
  );
};

export default WaimaiNotice;
