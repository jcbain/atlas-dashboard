import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
        font-family: 'Quicksand', sans-serif;
    }

    @media (min-width: 1280px) {
        grid-column: span 12 / span 12;
    }
`

export default GlobalStyle;