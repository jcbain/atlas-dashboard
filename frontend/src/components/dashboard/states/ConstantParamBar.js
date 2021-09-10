import styled from "styled-components";

const ConstantParamBar = ({ state }) => {
    const global = state.global;

    return (
        <ConstParamWrapper>
            { global && global.map((param, index) => {
                return(
                    <IndividualParam key={index}>
                        <ParamTitles>{param.label}</ParamTitles>
                        {param.value}
                    </IndividualParam>
                )})
            }   
        </ConstParamWrapper>
    )
}

export { ConstantParamBar };

const ConstParamWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5rem;
`

const IndividualParam = styled.div`
    flex-grow: 1;
    padding: 1rem;
    text-align: center;
    border-width: 2px;
    border-radius: 0.30rem;
    border-style: solid;
    border-color: ${props => props.theme.paramCardOutline};
    color: ${props => props.theme.paramHeaderColor};
`

const ParamTitles = styled.h6`
    font-weight: bold;
`