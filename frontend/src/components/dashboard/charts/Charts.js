import { Parameters } from "../parameters";
import { GenomeChart, LineChart, HistogramChart } from '.';

//Chart wrapper
const Charts = ({ state, updateTab }) => {
    const isStatic = state.isStatic;

    return (
        state && 
        <div className="row border rounded p-2">
            <div className="col-md-12 mb-2">
                <div className="row p-2">
                    <GenomeChart state={state} />

                    <div className="col-md-3">
                        { isStatic &&
                            <Parameters
                                state={state}
                                updateTab={updateTab}
                                paramName={'genome'}
                            />
                        }
                    </div>
                </div>
            </div>


            <div className="col-md-6">
                <div className="row p-2">
                    <HistogramChart state={state} />

                    { isStatic &&
                        <div className="col-md-3">
                            <Parameters
                                state={state}
                                updateTab={updateTab}
                                paramName={'histo'}
                            />
                        </div>
                    }
                </div>
            </div>

            <div className="col-md-6">
                <div className="row p-2">
                    <LineChart state={state} />

                    { isStatic &&
                        <div className="col-md-3">
                            <Parameters
                                state={state}
                                updateTab={updateTab}
                                paramName={'line'}
                            />
                        </div>
                    }
                </div>
            </div>


        </div>
    )
}

export { Charts };