import React from 'react';
import { Input, Space, Col, Row } from 'antd';
const { Search } = Input;

function SearchInput({ name, setName }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={18} md={16} lg={14} xl={12} xxl={10}>
        <Space direction="vertical" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Search
            placeholder="Search Github User"
            value={name}
            allowClear
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 800,
            }}
          />
        </Space>
      </Col>
    </Row>
  );
}

export default SearchInput;
