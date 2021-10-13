import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    * {
        box-sizing: border-box;
        margin: 0; 
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }

    @media (min-width: 480px) {
        grid-column: span 12 / span 12;
    }
`;

export default GlobalStyle;
