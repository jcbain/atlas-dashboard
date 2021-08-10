import Select from 'react-select'

function Dropdown({ parameters, setParameters }) {
    const options = JSON.parse(sessionStorage.getItem('options'));

    const onSelect = (e, index) => {
        let n = [...parameters];
        n[index].value=e.label;
        setParameters(n);
    }

    return (
        <div>
            <h3 className="text-center mb-5">Parameters</h3>
            { parameters && parameters.map((e, index) => {
                return (
                    <div className="row" key={index}>
                        <label className="col-12">
                            {e.label}
                        </label>

                        <Select
                            className="mb-4 col-12"
                            placeholder={e.value}
                            options={options[e.label]}
                            onChange={(event) => {
                                onSelect(event, index)
                            }}
                        />
                    </div>
                );
            })}
        </div>
    )
}

export default Dropdown;