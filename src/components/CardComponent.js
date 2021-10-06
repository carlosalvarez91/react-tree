import React, {useContext, useState} from 'react';
import { Card } from 'antd';
import { CardInfoContext } from '../context/CardInfoContext';
import ModalComponent from './ModalComponent';

export default function CardComponent(props){

    const {cardInfo} = useContext(CardInfoContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [project, setProject] = useState(null)

    const showModal = (c) => {
        setProject(c)
        setIsModalVisible(true);
      };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!cardInfo){
        return null
    }

    return <React.Fragment>
            <Card size="small" title={cardInfo.cardTitle} style={{ width: '100%', margin: '0 auto' }}>
                { Object.values(cardInfo.contentGroups).map((e,i)=>{
                    let content = e.content
                    return (
                    <div key={i}>
                        <h1>{e.key}</h1>
                        {content.map((c,j)=>{
                            return <p key={e.content+j}>{c.label}: {c.content} {c.label === 'Project'&& <a onClick={()=>showModal(c)}> edit</a>}</p>
                        })}
                    </div>
                    )
                })}
            </Card>
            {project && isModalVisible && <ModalComponent
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            project={project}
            />}
            </React.Fragment>
}