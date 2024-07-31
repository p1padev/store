import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../../zustand-store/useProductStore';
import { formatCurrency } from '../Card/Card';
import CartProduct from './CartProduct';

const Modal = styled.dialog`
  top: calc(100% + 20px);
  left: auto;
  right: 0;
  text-align: left;
  bottom: auto;
  background-color: ${(props) => props.theme.colors.light};
  box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  width: 85vw;
  max-width: 500px;
  max-height: 60vh;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.xlarge} 0.7rem 0;
`;

const Header = styled.h3`
  border-bottom: 1px solid black;
  padding-bottom: ${(props) => props.theme.spacing.xsmall};
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;

const CloseButton = styled.button`
  appearance: none;
  cursor: pointer;
  background: transparent;
  border: 1px solid black;
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.light};
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
  gap: 10px;
  font-size: 1.2rem;
  padding-top: ${(props) => props.theme.spacing.small};
`;

const FinishBtn = styled.button`
  display: block;
  margin: 0 auto 0.5rem;
  width: fit-content;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  text-decoration: none;
  color: white;
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CartModal({ isOpen, setIsOpen }: CartModalProps) {
  const [cart, deleteItemFn] = useProductStore((state) => [
    state.cart,
    state.deleteItem,
  ]);

  const totalPrice = cart.reduce((acc, product) => {
    return (acc += product.price * product.amount);
  }, 0);

  return (
    <Modal open={isOpen}>
      <Header>Carrinho</Header>
      <CloseButton onClick={() => setIsOpen((prev) => !prev)}>
        Fechar
      </CloseButton>
      {cart.map((product) => (
        <CartProduct
          product={product}
          handleDelete={deleteItemFn(product.id)}
          key={product.id}
        />
      ))}
      {totalPrice !== 0 && (
        <TotalPrice>
          <div>Total:</div>
          {formatCurrency(totalPrice)}
        </TotalPrice>
      )}
      <FinishBtn as={Link} to={'/checkout'}>
        Finalizar
      </FinishBtn>
    </Modal>
  );
}
