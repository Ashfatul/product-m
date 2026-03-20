import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #001529;
  padding: 1rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 3;
`;

const HeaderTitle = styled.h1`
  margin: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Footer = styled.footer`
  background-color: #001529;
  padding: 1rem;
  color: white;
  text-align: center;
  position: sticky;
  bottom: 0;
  z-index: 3;
`;

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Header>
        <HeaderTitle>Product Management</HeaderTitle>
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