import styled, { keyframes } from "styled-components";

const ProgressBar = () => {
	return (
		<ProgressWrapper>
			<ProgressContainer/>
		</ProgressWrapper>
	);
}

export default ProgressBar;

const ProgressBarAnimation = keyframes`
    0% { width: 0%; }
	100% { width: 100%; }
`

const ProgressWrapper = styled.div`
	height: 3rem;
	background-color: rgba(107, 114, 128, 1);
	position: relative;
	border-radius: 1.5rem;
`

const ProgressContainer = styled.div`
	position: absolute;
	height: 100%;
	background-color: rgba(124, 58, 237, 1);
	animation-name: ${ProgressBarAnimation};
	animation-duration: 7s;
	animation-iteration-count: infinite;
	border-radius: 1.5rem;
`