import { ConstantParamBar, StaticSwitch } from "./states";
import { Parameters } from "./parameters";
import { Charts } from "./charts";

const TabContents = ({ state, updateTab }) => {
    const isStatic = state.isStatic;

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-9">
                    <ConstantParamBar state={state}/>
                </div>
                
                <div className="col-md-3">
                    <StaticSwitch
                        state={state}
                        updateTab={updateTab}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className={`${ !isStatic ? 'col-md-9' : 'col-md-12'}`}>
                    <Charts 
                        state={state}
                        updateTab={updateTab}
                    />
                </div>

                {   
                    !isStatic &&
                    <div className="col-md-3">
                        <Parameters state={state}
                            updateTab={updateTab}
                            paramName={'global'}
                        />
                    </div>
                }
            </div>

        </div>
    )
}

export default TabContents;