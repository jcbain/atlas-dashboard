import styled from 'styled-components';

export const TickText = styled.text`
    font-family: 'Roboto';
    fill: '#4d4d4d';
`

TickText.defaultProps = {
    theme: {
        simpleFont: 'sans-serif',
        axisTickFill: 'black'
    }
}

export const TickLine = styled.line`
    fill: '#4d4d4d';
`;