import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(248, 249, 250, 255);
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: initial;
  }

  h1,
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  input,
  button {
    outline: none;
    border: 0;
  }
  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
