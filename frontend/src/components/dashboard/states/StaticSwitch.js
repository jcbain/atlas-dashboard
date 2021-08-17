import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const StaticSwitch = ({ state, updateTab }) => {
    const isStatic = state.isStatic;
    
    return (
        <div className="d-flex justify-content-center border rounded p-3">
            <h4 className="mr-3">Static</h4>
            <BootstrapSwitchButton
                checked={isStatic}
                offstyle="secondary"
                onChange={() => updateTab('isStatic', !isStatic)}
            />
        </div>
    )
}


export { StaticSwitch };