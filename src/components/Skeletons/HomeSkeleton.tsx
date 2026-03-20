import styled from "styled-components";
import { Skeleton } from "antd";
import { colors, shadows } from "../../theme/colors";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
  text-align: center;
  background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%);
  border-radius: 12px;
  padding: 4rem 2rem;
  color: white;
  box-shadow: ${shadows.xl};
`;

const SkeletonContent = styled.div`
  width: 100%;
  max-width: 600px;
  
  .ant-skeleton {
    margin-bottom: 2rem;
  }

  .ant-skeleton-title {
    height: 60px !important;
    margin-bottom: 1.5rem;
  }

  .ant-skeleton-paragraph {
    margin-bottom: 2rem;
    
    .ant-skeleton-paragraph-item {
      height: 20px;
      margin-bottom: 12px;
      
      &:last-child {
        width: 80%;
        margin: 0 auto;
      }
    }
  }

  .button-skeleton {
    height: 48px;
    width: 200px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    animation: pulse 1.5s ease-in-out infinite;
    margin: 0 auto;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;

export default function HomeSkeleton() {
  return (
    <HeroContainer>
      <SkeletonContent>
        <Skeleton 
          paragraph={{ rows: 3 }} 
          active 
          style={{ 
            background: 'transparent',
          }}
        />
        <div className="button-skeleton" />
      </SkeletonContent>
    </HeroContainer>
  );
}
