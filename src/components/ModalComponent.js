import React, {useContext, useState} from 'react';
import { Modal, Button, Input } from 'antd';
import { CardInfoContext } from '../context/CardInfoContext';
import { putProject } from '../services/global';

export default function ModalComponent(props){

  const {project} = props;
  const {cardInfo, setCardInfo } = useContext(CardInfoContext)
  const [newProject, setNewProject] = useState(project)

    const handleSubmit = () =>{
        putProject(newProject).then(data=>{
          console.log(data)
        }).catch(error=>{
          console.log(error)
        })
    }
    if (!project){
      return null
    }


    return  <Modal
            title="Edit Project"
            visible={props.isModalVisible}
            onCancel={props.handleCancel}
            footer={[
                <Button key="back" onClick={props.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            ]}
            >
                <p>Name</p>
                <Input onChange={(e)=>{
                  setNewProject({...newProject, content: e.target.value})
                }} defaultValue={project.content} placeholder="Name" />

            </Modal>
}