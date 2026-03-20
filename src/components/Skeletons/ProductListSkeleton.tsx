import styled from "styled-components";
import { colors } from "../../theme/colors";

const SkeletonContainer = styled.div`
  width: 100%;
`;

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  .header-title {
    height: 32px;
    width: 150px;
    border-radius: 4px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .search-filter {
    display: flex;
    gap: 1rem;
    
    .search-box {
      height: 32px;
      width: 300px;
      border-radius: 4px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .filter-btn {
      height: 32px;
      width: 150px;
      border-radius: 4px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
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

const TableSkeleton = styled.div`
  width: 100%;
  border: 1px solid ${colors.borderColor};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  .table-header {
    background-color: ${colors.primary};
    display: grid;
    grid-template-columns: 300px 100px 100px 100px 150px 100px;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid ${colors.borderColor};

    .header-cell {
      height: 20px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }
  }

  .table-body {
    .table-row {
      display: grid;
      grid-template-columns: 300px 100px 100px 100px 150px 100px;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid ${colors.borderColor};

      &:nth-child(even) {
        background-color: ${colors.bgTertiary};
      }

      .row-cell {
        height: 20px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
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

export default function ProductListSkeleton() {
  const rowCount = 5;

  return (
    <SkeletonContainer>
      <HeaderArea>
        <div className="header-title" />
        <div className="search-filter">
          <div className="search-box" />
          <div className="filter-btn" />
        </div>
      </HeaderArea>

      <TableSkeleton>
        <div className="table-header">
          <div className="header-cell" />
          <div className="header-cell" />
          <div className="header-cell" />
          <div className="header-cell" />
          <div className="header-cell" />
          <div className="header-cell" />
        </div>
        <div className="table-body">
          {Array.from({ length: rowCount }).map((_, index) => (
            <div key={index} className="table-row">
              <div className="row-cell" />
              <div className="row-cell" />
              <div className="row-cell" />
              <div className="row-cell" />
              <div className="row-cell" />
              <div className="row-cell" />
            </div>
          ))}
        </div>
      </TableSkeleton>
    </SkeletonContainer>
  );
}
