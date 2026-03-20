import { Link } from "react-router-dom";
import styled from "styled-components";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 4rem 2rem;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  color: #fff;
  
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
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background-color: #f0f0f0;
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