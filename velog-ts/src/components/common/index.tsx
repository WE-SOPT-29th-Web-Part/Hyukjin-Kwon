import styled from 'styled-components';

interface IDelimterProps {
  width?: string;
  height?: string;
}

export const Delimiter = styled.hr<IDelimterProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'initial'};
  border: 1px solid ${(props) => props.color || 'rgb(209, 209, 209)'};
  margin: 3% 0;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgb(241, 243, 245);
  color: rgb(18, 184, 134);
  border-radius: 16px;

  &:hover {
    cursor: pointer;
  }
`;
