import React from 'react';

import { createGlobalStyle } from 'styled-components';

import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoContainer from './components/TodoContainer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <NavBar />
      <TodoContainer />
      <Footer />
    </>

  );
}

const GlobalStyle = createGlobalStyle`
  #root, body {
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
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

export default App;
