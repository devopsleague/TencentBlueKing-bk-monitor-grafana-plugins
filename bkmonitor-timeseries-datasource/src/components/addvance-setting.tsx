/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import Select from 'antd/es/select';
import React from 'react';

import { EditMode } from '../typings/metric';
import { getEnByName } from '../utils/utils';
import AliasInput from './alias-input';
import EditorForm from './editor-form';

export type AddvanceSettingKey = 'format' | 'promqlAlias' | 'step' | 'type';
export interface IAddvanceSettingProps {
  format: string;
  mode: EditMode;
  onChange?: (key: AddvanceSettingKey, value: string) => void;
  onFormatChange?: (v: string) => void;
  onMinStepChange?: (v: string) => void;
  onPromqlAliasChange?: (v: string) => void;
  onTypeChange?: (v: string) => void;
  promqlAlias: string;
  step: string;
  type: string;
}

interface IAddvanceState {
  showContent: boolean;
}
const formatList = [
  {
    id: 'time_series',
    name: 'Time Series'
  },
  {
    id: 'table',
    name: 'Table'
  },
  {
    id: 'heatmap',
    name: 'Heatmap'
  }
];
const typeList = [
  {
    id: 'range',
    name: 'Range'
  },
  {
    id: 'instant',
    name: 'Instant'
  }
];
export default class AddvanceSetting extends React.PureComponent<IAddvanceSettingProps, IAddvanceState> {
  constructor(props: IAddvanceSettingProps) {
    super(props);
    this.state = {
      showContent: false
    };
  }
  // eslint-disable-next-line perfectionist/sort-classes
  handleClickTitle = () => {
    this.setState({
      showContent: !this.state.showContent
    });
  };
  render(): JSX.Element {
    const { showContent } = this.state;
    const { format, mode, onChange, promqlAlias, step, type } = this.props;
    const getHeaderContent = () => (
      <div className='header-content'>
        {mode === 'code' && <span className='header-content-item'>Min Step: {step || 'auto'}</span>}
        {mode === 'code' && (
          <span className='header-content-item'>
            {getEnByName('别名')}: {promqlAlias || '-'}
          </span>
        )}
        <span className='header-content-item'>
          {getEnByName('输出模式')}: {formatList.find(item => item.id === format)?.name || 'Time Series'}
        </span>
        <span className='header-content-item'>
          {getEnByName('类型')}: {typeList.find(item => item.id === type)?.name || 'Range'}
        </span>
      </div>
    );
    const uiForm = () => (
      <>
        <EditorForm title={getEnByName('输出模式')}>
          <Select
            dropdownStyle={{ minWidth: '100px' }}
            onChange={v => onChange('format', v)}
            value={format}
          >
            {formatList.map(item => (
              <Select.Option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <EditorForm title={getEnByName('类型')}>
            <Select
              onChange={v => onChange('type', v)}
              value={type}
            >
              {typeList.map(item => (
                <Select.Option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </EditorForm>
        </EditorForm>
      </>
    );
    return (
      <div className='addvance-setting'>
        <div className='addvance-setting-title'>
          <span
            onClick={this.handleClickTitle}
            style={{ display: 'flex' }}
          >
            <i className={`fa fa-angle-down ${showContent ? 'is-open' : ''}`} />
            {getEnByName('高级配置')}
          </span>
          {!showContent && getHeaderContent()}
        </div>
        <div className={`addvance-setting-content ${showContent ? '' : 'is-hidden'}`}>
          {mode === 'code' ? (
            <EditorForm title='Min Step'>
              <AliasInput
                inputProps={{ defaultValue: step, placeholder: 'auto' }}
                onChange={v => onChange('step', v)}
                style={{ height: '32px', width: '88px' }}
              />
              <EditorForm title={getEnByName('别名')}>
                <AliasInput
                  inputProps={{ defaultValue: promqlAlias }}
                  onChange={v => onChange('promqlAlias', v)}
                  style={{ height: '32px', width: '288px' }}
                />
              </EditorForm>
              <EditorForm title={getEnByName('输出模式')}>
                <Select
                  dropdownStyle={{ minWidth: '100px' }}
                  onChange={v => onChange('format', v)}
                  value={format}
                >
                  {formatList.map(item => (
                    <Select.Option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </EditorForm>
              <EditorForm title={getEnByName('类型')}>
                <Select
                  onChange={v => onChange('type', v)}
                  value={type}
                >
                  {typeList.map(item => (
                    <Select.Option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </EditorForm>
            </EditorForm>
          ) : (
            uiForm()
          )}
        </div>
      </div>
    );
  }
}
