import Select from 'react-select';
import styled from 'styled-components';

function Dropdown({ parameters, setParameters, state }) {
    const options = JSON.parse(sessionStorage.getItem('options'));
    const isStatic = state.isStatic;

    const onSelect = (e, index) => {
        let n = [...parameters];
        n[index].value=e.label;
        setParameters(n);
    }

    return (
        <>
            {!isStatic && <Header>Parameters</Header>}
            { parameters && parameters.map((e, index) => {
                return (
                    <ParamWrapper key={index}>
                        <Label>
                            {e.label}
                        </Label>

                        <Selection
                            placeholder={e.value}
                            options={options[e.label]}
                            onChange={(event) => {
                                onSelect(event, index)
                            }}
                        />
                    </ParamWrapper>
                );
            })}
        </>
    )
}

export default Dropdown;

const Header = styled.h3`
    margin-bottom: 3rem;
`
const ParamWrapper = styled.div`
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`
const Label = styled.label`
    font-size: 0.75rem;
    font-weight: bold;
`
const Selection = styled(Select)`
    margin: 0 1rem 0 0;
`