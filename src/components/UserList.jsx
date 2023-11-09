import React, { useState } from 'react';
import { Card, Skeleton, Row, Col, Pagination , Result, Button } from 'antd';

const { Meta } = Card;

function UserList({ searchResults, handleUserClick, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; 

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentPageData = searchResults.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if (!loading && searchResults.length === 0) {
    return (
      <Result
        status="404"
        title="User not found"
        subTitle="Please try with another name."
        extra={<Button type="primary" onClick={() => window.location.reload()}>Try Again</Button>}
      />
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]} justify="center">
        {currentPageData.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
              <Card
                style={{ width: '100%', marginTop: '15px' }}
                cover={<img alt="example" src={user.avatar_url} />}
                onClick={() => handleUserClick(user)}
              >
                <Meta title={user.login} />
              </Card>
            </Skeleton>
          </Col>
        ))}
      </Row>
     
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchResults.length}
          onChange={onPageChange}
          style={{ textAlign: 'center', marginTop: '16px' }}
        />
      
    </div>
  );
}

export default UserList;