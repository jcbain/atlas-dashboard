import React from 'react';
import styled from 'styled-components';
import { round } from 'lodash';

const LegendWrapper = styled.div`
    display: grid;
    grid-template-rows: .5fr 1fr .5fr;
    width: 100%;
	max-width: 20rem;
    font-family: ${({ theme }) => theme.simpleFont};
    font-size: 0.75rem;
`

const LegendTitle = styled.p`
    justify-self: center;
	margin: 0;
`

const GradientLegend = styled.div`
    align-self: end;
    display: grid;
    grid-template-columns: 48% 4% 48%;
    flex-direction: row;
    height: 0.40rem;
`

const LegendHigh = styled.div`
    background: linear-gradient(to left, ${({ theme }) => theme.maxGreaterZeroColor}, ${({ theme }) => theme.minGreaterZeroColor});
    border-top-right-radius: 3.5px;
    border-bottom-right-radius: 3.5px;
`

const LegendMid = styled.div`
    background: ${({ theme }) => theme.zeroColor};
`

const LegendLow = styled.div`
    background: linear-gradient(to left, ${({ theme }) => theme.maxLessZeroColor}, ${({ theme }) => theme.minLessZeroColor});
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`

const LegendLables = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & p{
        text-align: center;
    }
`

const Legend = ({ title, minVal, maxVal }) => {

	return (
		<LegendWrapper>
			<LegendTitle>{title}</LegendTitle>
			<GradientLegend>
				<LegendLow />
				<LegendMid />
				<LegendHigh />
			</GradientLegend>
			<LegendLables>
				<p>{round(minVal, 4)}</p>
				<p>0</p>
				<p>{round(maxVal, 4)}</p>
			</LegendLables>

		</LegendWrapper>
	)

}

export default Legend;