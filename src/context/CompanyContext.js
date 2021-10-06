import React, { useState } from "react";


const CompanyContext = React.createContext();

function CompanyProvider(props) {
    const [selectedCompany, setSelectedCompany] = useState(null);

    return (
        <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
            {props.children}
        </CompanyContext.Provider>
    );
}

export { CompanyContext, CompanyProvider };