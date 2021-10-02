import React, {useContext} from 'react';
import { Card } from 'antd';
import { CardInfoContext } from '../context/CardInfoContext';

export default function CardComponent(props){

    const {cardInfo} = useContext(CardInfoContext)

    console.log('cardInfo......................',cardInfo)

    /*
    contentGroups:{
        group_1: {key: "Company info", content: Array(1)}
        group_2: {key: "Company projects", content: Array(4)}
    }
    */
    if (!cardInfo){
        return null
    }

    return <Card size="small" title={cardInfo.cardTitle} extra={<a href="#">More</a>} style={{ width: '100%', margin: '0 auto' }}>
                { Object.values(cardInfo.contentGroups).map((e,i)=>{
                    let content = e.content
                    console.log('......................e',e)
                    return (
                    <div key={i}>
                        <h1>{e.key}</h1>
                        {content.map((c,j)=>{
                            return <p key={e.content+j}>{c.label}: {c.content}</p>
                        })}
                    </div>
                    )
                })}
            </Card>
}