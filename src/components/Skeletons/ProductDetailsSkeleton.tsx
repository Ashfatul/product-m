import styled from "styled-components";
import { Skeleton, Row, Col, Card } from "antd";
import { colors } from "../../theme/colors";

const Container = styled.div`
  padding: 24px;
`;

const SkeletonCard = styled(Card)`
  .ant-card-body {
    .skeleton-block {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;

      &.image-block {
        height: 400px;
        width: 100%;
        margin-bottom: 1rem;
      }

      &.title-block {
        height: 32px;
        width: 80%;
        margin-bottom: 1rem;
      }

      &.badge-block {
        height: 24px;
        width: 100px;
        margin-bottom: 1.5rem;
      }

      &.price-block {
        height: 52px;
        width: 60%;
        margin-bottom: 1.5rem;
      }

      &.text-block {
        height: 20px;
        width: 100%;
        margin-bottom: 0.5rem;

        &:last-child {
          width: 95%;
        }
      }

      &.description-block {
        height: 60px;
        width: 100%;
        margin-bottom: 1.5rem;

        &::before {
          content: '';
          display: block;
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          margin-bottom: 0.5rem;
          border-radius: 4px;
        }
      }
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const MetricsRow = styled(Row)`
  margin: 1.5rem 0;

  .metric-item {
    .metric-label {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      height: 14px;
      width: 60px;
      margin-bottom: 0.5rem;
      border-radius: 4px;
    }

    .metric-value {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      height: 28px;
      width: 80%;
      margin-top: 0.5rem;
      border-radius: 4px;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  }
`;

const SpecificationsTable = styled.div`
  margin-top: 1.5rem;

  .spec-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid ${colors.borderColor};

    &:nth-child(even) {
      background-color: ${colors.bgTertiary};
    }

    .spec-label {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      height: 20px;
      border-radius: 4px;
    }

    .spec-value {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      height: 20px;
      border-radius: 4px;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  }
`;

export default function ProductDetailsSkeleton() {
  return (
    <Container>
      <Row gutter={[24, 24]}>
        {/* Image Section Skeleton */}
        <Col xs={24} sm={24} md={10}>
          <SkeletonCard>
            <div className="skeleton-block image-block" />
          </SkeletonCard>
        </Col>

        {/* Details Section Skeleton */}
        <Col xs={24} sm={24} md={14}>
          <SkeletonCard>
            {/* Title and Badge */}
            <div className="skeleton-block title-block" />
            <div className="skeleton-block badge-block" />

            {/* Price */}
            <div className="skeleton-block price-block" />

            {/* Metrics */}
            <MetricsRow gutter={16}>
              <Col xs={24} sm={12}>
                <div className="metric-item">
                  <div className="metric-label" />
                  <div className="metric-value" />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="metric-item">
                  <div className="metric-label" />
                  <div className="metric-value" />
                </div>
              </Col>
            </MetricsRow>

            {/* Description */}
            <div style={{ marginTop: '1.5rem' }}>
              <Skeleton 
                paragraph={{ rows: 2 }} 
                active 
                avatar={false}
                style={{ background: 'transparent' }}
              />
            </div>

            {/* Specifications Table */}
            <SpecificationsTable>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="spec-row">
                  <div className="spec-label" />
                  <div className="spec-value" />
                </div>
              ))}
            </SpecificationsTable>
          </SkeletonCard>
        </Col>
      </Row>
    </Container>
  );
}
