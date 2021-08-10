import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { actions } from "../../state"
import { Tabs, Tab } from 'react-bootstrap'
import TabContents from "./TabContents";

const Dashboard = () => {
    // Current tab index and it's state
    const [ activeTab, setActiveTab ] = useState(0);
    const state = useSelector((state) => state.tabState);

    // Dispatch for redux
    const dispatch = useDispatch();
    const { updateTab, switchTab } = bindActionCreators(actions, dispatch);

    // SessionStorage containing array of tabs data: [{ tabData1 }, { tabData2 }, ...]
    const storage = JSON.parse(sessionStorage.getItem('tabs'));

    /* 
        If sessionStorage does not contain tabs data    
        Or update existing sessionStorage tab data
    */
    useEffect(() => {
        if(!storage) {
            sessionStorage.setItem('tabs', JSON.stringify([state]));
        } else {
            storage[activeTab] = state;
            sessionStorage.setItem('tabs', JSON.stringify(storage));
        }
    }, [state]);

    // When tab is switched, update redux state to selected tab
    useEffect(()=> {
        switchTab(activeTab);
    },[activeTab]);
    
    // Push new tab state to sessionStorage tab array
    const handleAddTab = () => {
        storage.push(state);
        setActiveTab(storage.length-1);
        sessionStorage.setItem('tabs', JSON.stringify(storage));
    };
    
    return (
        <div>
            { storage && 
                <Tabs
                    activeKey={ activeTab }
                    onSelect={(tab) => setActiveTab(tab)}
                    className="mb-3"
                >
                    { 
                        storage.map((tab, index) => {
                            return (
                                <Tab eventKey={index} title={`Tab ${index+1}`} key={index}>
                                    <TabContents
                                        state={state}
                                        updateTab={updateTab}
                                    />
                                </Tab>
                            )}
                        )
                    }
                </Tabs>
            }
            
            <div onClick={()=>handleAddTab()}>+</div>

        </div>
    )
}

export default Dashboard;