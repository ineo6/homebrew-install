import React, { useState, useEffect } from 'react';
import { Select, Tooltip, Checkbox } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// @ts-ignore
import SourceCode from 'dumi-theme-default/src/builtins/SourceCode';

import './SourceGenerate.less';
import CaskCard from './CaskAndFormula/Cask';
import { Card, List, Input, Tabs } from 'antd';
import queryString from 'query-string';

const Option = Select.Option;
const { Search } = Input;

const CaskAndFormula = ({}) => {
  const [listParams, setListParams] = useState({
    page: 1,
    pageSize: 12,
  });
  const [activeKey, setActiveKey] = useState('cask');

  const [caskPageData, setCaskPageData] = useState({
    data: [],
    total: 0,
  });

  const [formulaPageData, setFormulaPageData] = useState({
    data: [],
    total: 0,
  });

  useEffect(() => {
    getList();
  }, [activeKey, listParams]);

  const getList = () => {
    if (activeKey === 'cask') {
      getCaskList();
    } else {
      getFormula();
    }
  };

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const getCaskList = () => {
    fetch(
      AVALON_SERVER + '/homebrew/cask-list?' +
        queryString.stringify(listParams),
    )
      .then(response => response.json())
      .then(res => {
        if (res.code === 0 && res.result) {
          setCaskPageData(res.result);
        }
      });
  };

  const getFormula = () => {
    fetch(
      AVALON_SERVER + '/homebrew/formula-list?' +
        queryString.stringify(listParams),
    )
      .then(response => response.json())
      .then(res => {
        if (res.code === 0 && res.result) {
          const result = res.result

          if (result && result.data) {
            result.data.forEach(item => {
            })
          }

          setFormulaPageData(result);
        }
      });
  };

  const openCaskDetail = item => {
    window.open('/app-detail?cid=' + item.id);
  };

  const openFormulaDetail = item => {
    window.open('/app-detail?fid=' + item.id);
  };

  const onSearch = value => {
    setListParams({
      ...listParams,
      page: 1,
      search: value,
    });

    getList();
  };

  const renderCask = () => {
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={caskPageData.data}
        pagination={{
          onChange: page => {
            console.log(page);
            setListParams({
              ...listParams,
              page,
            });
          },
          pageSize: listParams.pageSize,
          total: caskPageData.total,
        }}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.token}
              extra={<a onClick={openCaskDetail.bind(this, item)}>查看</a>}
            >
              <div>{item.desc}</div>
              <div>
                <div style={{ marginTop: '10px', color: '#999' }}>
                  {item.version}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  };

  const renderFormula = () => {
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={formulaPageData.data}
        pagination={{
          onChange: page => {
            setListParams({
              ...listParams,
              page,
            });
          },
          pageSize: listParams.pageSize,
          total: formulaPageData.total,
        }}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.name}
              extra={<a onClick={openFormulaDetail.bind(this, item)}>查看</a>}
            >
              <div>{item.desc}</div>
              <div>
                <div style={{ marginTop: '10px', color: '#999' }}>
                  {item.versions.stable}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div className="__dumi-default-cask-and-formula">
      <Tabs
        defaultActiveKey={activeKey}
        onChange={onChange}
        size="large"
        items={[
          {
            key: 'cask',
            label: 'Cask',
          },
          {
            key: 'formula',
            label: 'Formula',
          },
        ]}
      />

      <div>
        <Search
          placeholder="搜索..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {activeKey === 'cask' ? renderCask() : renderFormula()}
      </div>
    </div>
  );
};

export default CaskAndFormula;
