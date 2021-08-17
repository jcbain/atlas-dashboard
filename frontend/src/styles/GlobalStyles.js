import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
        font-family: 'Quicksand', sans-serif;
    }
`

export default GlobalStyle;