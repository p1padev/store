import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/logo.png';

const StyledHeader = styled.header`
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: #f10f62;
  color: white;

  & > * {
    flex: 1;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
`;

const HeaderLogo = styled.h1`
  display: flex;
  justify-content: center;
`;

interface props {
  showCart: boolean;
}

export default function Header({ showCart = false }: props) {
  return (
    <StyledHeader>
      <nav>
        <NavList>
          <li>
            <StyledLink to="/">Loja</StyledLink>
          </li>
          <li>
            <StyledLink to="/checkout">Carrinho</StyledLink>
          </li>
        </NavList>
      </nav>
      <HeaderLogo>
        <img src={Logo} alt="Anivers" />
      </HeaderLogo>
      {/* TODO: Cart: */}
      {showCart && <div>Cart</div>}
    </StyledHeader>
  );
}
