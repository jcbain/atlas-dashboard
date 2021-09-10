import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import { actions } from "../../state"
import { Tabs, Tab } from 'react-bootstrap'
import TabContents from "./TabContents";
import styled from "styled-components";

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
        <>
            <AddButton onClick={()=>handleAddTab()}>+</AddButton>
            { storage && 
                <TabsContainer
                    activeKey={ activeTab }
                    onSelect={(tab) => setActiveTab(tab)}
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
                </TabsContainer>
            }
        </>
    )
}

export default Dashboard;

const AddButton = styled.button`
    background-color: ${props => props.theme.paramCardBackground};
    border-width: 2px;
    border-radius: 0.30rem;
    border-style: solid;
    border-color: ${props => props.theme.paramHeaderColor};
    border-radius: 0.30rem;
    color: ${props => props.theme.tabFontColor};
    margin-bottom: 1rem;
    padding: 0.25rem 0.75rem;
`

const TabsContainer = styled(Tabs)`
    margin-bottom: 1rem;
    color: ${props => props.theme.tabFontColor};
    border-bottom: 2px solid ${props => props.theme.chartCardOutline};
`