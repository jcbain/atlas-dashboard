const ConstantParamBar = ({ state }) => {
    const global = state.global;

    return (
        <div className="row d-flex flex-row">
            { global && global.map((param, index) => {
                return(
                    <div key={index} className="p-2 mx-2 text-center rounded border border-secondary flex-fill">
                        <h5>{param.label}</h5>
                        {param.value}
                    </div>
                )})
            }   
        </div>
    )
}

export { ConstantParamBar };