const defaultTab = {
    isStatic: false,
    global: [],
    line: [],
    histo: [],
    genome: []
}

const reducer = (state=defaultTab, action) => {
    const storage = JSON.parse(sessionStorage.getItem('tabs'));
    let payload = action.payload;

    switch (action.type) {
        case "update":
            let newP = {...state}
            newP[payload.name] = payload.value;
            return {...newP}

        case "switch":
            return storage[payload.tab];
            
        default:
            return state
    }
}

export default reducer;