import React, { useState } from "react";


const CardInfoContext = React.createContext();

function CardInfoProvider(props) {
    const [cardInfo, setCardInfo] = useState(null);

    return (
        <CardInfoContext.Provider value={{ cardInfo, setCardInfo }}>
            {props.children}
        </CardInfoContext.Provider>
    );
}

export { CardInfoContext, CardInfoProvider };