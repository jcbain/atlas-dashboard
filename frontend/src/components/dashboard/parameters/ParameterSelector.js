import Select from 'react-select'

function ParameterSelector({ parameters, setParameters, options }) {
    const onSelect = (e, index) => {
        let n = [...parameters]
        n[index].value=e.label
        setParameters(n);
    }

    return (
        <div>
            <h3 className="text-center mb-5">Parameters</h3>
            { parameters.map((e, index) => {
                return (
                    <div className="row">
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

export default ParameterSelector;