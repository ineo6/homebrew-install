import React, { useState, useEffect } from 'react';
import { Select, Input, Table } from 'antd';
import queryString from 'query-string';
// @ts-ignore
import SourceCode from 'dumi-theme-default/src/builtins/SourceCode';
// @ts-ignore
import Alert from 'dumi-theme-default/src/builtins/Alert';
import { ColumnsType } from 'antd/es/table';
import './CaskAndFormula/app-detail.less';

const Option = Select.Option;
const { Search } = Input;

const getQuery = () => {
  return queryString.parse(window.location.search);
};

interface DataType {
  arch: string;
  os: string;
  version: string;
  url: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'arch',
    dataIndex: 'arch',
    width: 200,
    onCell: (_, index) => {
      if (index === 0) {
        return { rowSpan: 10 };
      }

      return { rowSpan: 0 };
    },
  },
  {
    title: 'os',
    dataIndex: 'os',
    width: 300,
  },
  {
    title: 'version',
    dataIndex: 'version',
    render: (text, row) => {
      return (
        <a href={row.url} target="_blank" rel="noopener noreferrer">
          {row.version}
        </a>
      );
    },
  },
];

const AppDetail = ({}) => {
  const [caskDetail, setCaskDetail] = useState({});
  const [formulaDetail, setFormulaDetail] = useState({});
  const [isCask, setIsCask] = useState(true);

  useEffect(() => {
    const query = getQuery();

    if (query.cid) {
      getCaskDetail(query.cid);
      setIsCask(true);
    } else if (query.fid) {
      getFormulaDetail(query.fid);
      setIsCask(false);
    }
  }, []);

  const getCaskDetail = id => {
    fetch(
      'http://localhost:8000/homebrew/cask-detail?' +
        queryString.stringify({
          id,
        }),
    )
      .then(response => response.json())
      .then(res => {
        if (res.code === 0 && res.result) {
          const result = res.result;

          result.variations = JSON.parse(result.variations);
          result.depends_on = JSON.parse(result.depends_on);

          setCaskDetail(result);
        }
      });
  };

  const getFormulaDetail = id => {
    fetch(
      'http://localhost:8000/homebrew/formula-detail?' +
        queryString.stringify({
          id,
        }),
    )
      .then(response => response.json())
      .then(res => {
        if (res.code === 0 && res.result) {
          const result = res.result;

          // result.versions = JSON.parse(result.versions);
          // result.versioned_formulae = JSON.parse(result.versioned_formulae);
          // result.dependencies = JSON.parse(result.dependencies);
          // result.build_dependencies = JSON.parse(result.build_dependencies);

          console.log(result);
          setFormulaDetail(result);
        }
      });
  };

  const renderObjectJson = obj => {
    if (!obj) return;

    const list: any = [];

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];

        for (const condition in element) {
          if (Object.prototype.hasOwnProperty.call(element, condition)) {
            const version = element[condition];

            list.push(
              <div>
                <p>
                  {key}
                  {condition}
                  {version}
                </p>
              </div>,
            );
          }
        }
      }
    }

    if (list.length === 0) return;

    return (
      <>
        <h3 className="app-detail-content-title">系统要求</h3>
        {list}
      </>
    );
  };

  const renderVariations = variations => {
    console.log(variations);
    if (!variations) return;

    const keys = Object.keys(variations);

    if (keys.length === 0) return;

    const intelDataArray: DataType[] = [];
    const appleSiliconDataArray: any = [];

    keys.forEach(key => {
      const value = variations[key];
      if (key.includes('arm64_')) {
        appleSiliconDataArray.push({
          arch: 'Apple Silicon',
          os: key.replace('arm64_', ''),
          url: value.url,
          version: value.version || caskDetail.version,
        });
      } else {
        intelDataArray.push({
          arch: 'Intel',
          os: key,
          url: value.url,
          version: value.version || caskDetail.version,
        });
      }
    });

    return (
      <>
        <h3 className="app-detail-content-title">软件版本</h3>
        <div className="variations-content">
          {intelDataArray.length > 0 && (
            <Table
              columns={columns}
              dataSource={intelDataArray}
              showHeader={false}
              pagination={false}
              bordered
            />
          )}

          {appleSiliconDataArray.length > 0 && (
            <Table
              columns={columns}
              dataSource={appleSiliconDataArray}
              showHeader={false}
              pagination={false}
              bordered
            />
          )}
        </div>
      </>
    );
  };

  const renderCask = () => {
    return (
      <>
        <div className="app-img">
          <span>
            <h1>
              {caskDetail.token} {caskDetail.version}
            </h1>
            <h2>{caskDetail.desc}</h2>
          </span>
        </div>
        <h3 className="app-detail-content-title">安装命令</h3>

        <SourceCode
          code={`brew install --cask ${caskDetail.token}`}
          lang="bash"
        />

        <div>{renderObjectJson(caskDetail.depends_on)}</div>

        {caskDetail.caveats && <Alert type="info">{caskDetail.caveats}</Alert>}

        {renderVariations(caskDetail.variations)}
      </>
    );
  };

  const renderVersionedFormulae = versionedFormulae => {
    if (!versionedFormulae || !versionedFormulae.length) return;

    return (
      <>
        <h3 className="app-detail-content-title">其他版本</h3>
        <Table
          columns={[
            {
              dataIndex: 'name',
              width: 200,
              render: (text, row) => {
                return <div>{text}</div>;
              },
            },
            {
              dataIndex: 'versions',
              render: (text, row) => {
                return <div>{text.stable}</div>;
              },
            },
          ]}
          dataSource={versionedFormulae}
          showHeader={false}
          pagination={false}
          bordered
        />
      </>
    );
  };

  const renderDep = (deps, title) => {
    if (!deps || !deps.length) return;

    return (
      <>
        <h3 className="app-detail-content-title">{title}</h3>
        <Table
          columns={[
            {
              dataIndex: 'name',
              width: 200,
              render: (text, row) => {
                return <div>{text}</div>;
              },
            },
            {
              dataIndex: 'versions',
              render: (text) => {
                return <div>{text.stable}</div>;
              },
            },
          ]}
          dataSource={deps}
          showHeader={false}
          pagination={false}
          bordered
        />
      </>
    );
  };

  const renderFormula = () => {
    return (
      <>
        <div className="app-img">
          <span>
            <h1>
              {formulaDetail.name} {formulaDetail.versions?.stable}
            </h1>
            <h2>{formulaDetail.desc}</h2>
          </span>
        </div>
        <h3 className="app-detail-content-title">安装命令</h3>

        <SourceCode code={`brew install ${formulaDetail.name}`} lang="bash" />

        {renderVersionedFormulae(formulaDetail.versioned_formulae)}

        {renderDep(formulaDetail.dependencies, '依赖')}

        {renderDep(formulaDetail.build_dependencies, '构建依赖')}
      </>
    );
  };

  return (
    <div className="__dumi-default-app-detail">
      <div className="app-detail-content">
        {isCask ? renderCask() : renderFormula()}
      </div>
    </div>
  );
};

export default AppDetail;
