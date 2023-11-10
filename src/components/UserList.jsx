import React, { useState } from 'react';
import { Card, Skeleton, Row, Col, Pagination, Result, Button } from 'antd';

const { Meta } = Card;

function UserList({ searchResults = [], loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentPageData = searchResults.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const redirectToRepo = (repoUrl) => {
    window.open(repoUrl, '_blank');
  };

  if (!loading && searchResults?.length === 0) {
    return (
      <Result
        status="404"
        title="User not found"
        subTitle="Please try with another name."
      />
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]} justify="center">
        {currentPageData?.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <Skeleton loading={loading} active avatar paragraph={{ rows: 1 }}>
              <Card
                hoverable
                style={{ width: '100%', marginTop: '15px' }}
                cover={<img alt={user.login} src={user?.avatar_url} />}
              >
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Meta style={{ marginTop: '2px' }} title={user.login} />
                  <Button onClick={() => redirectToRepo(user.html_url)}>Repo URl</Button>
                </div>
              </Card>
            </Skeleton>
          </Col>
        ))}
      </Row>

      {!loading && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchResults?.length}
          onChange={onPageChange}
          showQuickJumper
          showSizeChanger ={false}
          responsive
          style={{ textAlign: 'center', marginTop: '16px' }}
        />
      )}
    </div>
  );
}

export default UserList;
