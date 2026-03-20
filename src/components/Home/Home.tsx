import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, transitions, shadows } from "../../theme/colors";

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

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin: 0 0 3rem 0;
  opacity: 0.95;
  max-width: 600px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: ${colors.bgPrimary};
  color: ${colors.primary};
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all ${transitions.normal};
  cursor: pointer;
  box-shadow: ${shadows.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
    background-color: ${colors.bgSecondary};
  }
`;

export default function Home() {
  return (
    <HeroContainer>
      <HeroTitle>Welcome to Product Management</HeroTitle>
      <HeroSubtitle>
        Explore our collection of products and manage them with ease. 
        Get started by viewing our product catalog.
      </HeroSubtitle>
      <HeroButton to="/products">View Products</HeroButton>
    </HeroContainer>
  );
}