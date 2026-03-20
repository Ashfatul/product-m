import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { colors, transitions } from "../theme/colors";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${colors.headerBg};
  padding: 1rem 0;
  color: ${colors.headerText};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px ${colors.shadowColor};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: ${colors.headerText};
  font-size: 24px;
  font-weight: 700;
`;

const HeaderSubtitle = styled.p`
  margin: 0.25rem 0 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${colors.headerText};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color ${transitions.normal};
  
  &:hover {
    color: ${colors.primaryLight};
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${colors.headerBg};
  padding: 1rem;
  color: ${colors.headerText};
  text-align: center;
  position: sticky;
  bottom: 0;
  z-index: 100;
  box-shadow: 0 -2px 8px ${colors.shadowColor};
`;

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <HeaderInfo>
              <HeaderTitle>Product Management</HeaderTitle>
              <HeaderSubtitle>A simple product management app</HeaderSubtitle>
            </HeaderInfo>
          </Link>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      <Main>
        {children || <Outlet />}
      </Main>
      <Footer>
        &copy; {new Date().getFullYear()} Product Management App
      </Footer>
    </LayoutContainer>
  );
}