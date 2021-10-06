import React, {useContext, useState, useEffect} from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { putProject, getEmployeesByCompany, getCompanyProjects } from '../services/global';
import { CompanyContext } from '../context/CompanyContext';

const { Option } = Select;

export default function ModalComponent(props){

  const {project} = props;
  const {selectedCompany} = useContext(CompanyContext)
  const [newProject, setNewProject] = useState(null)
  const [availableEmployees, setAvailableEmployees] = useState([])
  const [currentEmployees, setCurrentEmployees] = useState([])

    const handleSubmit = () =>{
        putProject(newProject).then(data=>{
          console.log('putProject Response ',data)
          props.handleCancel()
        }).catch(error=>{
          console.log(error)
        })
    }

    const init = async ()=>{
      console.log(props.project.id)
      const responseGetEmployeesByCompany = await getEmployeesByCompany(selectedCompany)
      setAvailableEmployees(responseGetEmployeesByCompany)

      const responseGetCompanyProjects = await getCompanyProjects(selectedCompany)
     
      if (responseGetCompanyProjects.length > 0){
        let p = responseGetCompanyProjects.find(p=>p.id === props.project.id)

        console.log('p.....', p)
        setNewProject({...newProject, employeesId: p ? p.employeesId : []})
        if (p && p.employeesId.length > 0){
          let arr = []
          responseGetEmployeesByCompany.forEach(e=>{
            if (p.employeesId.includes( e.id )){
              arr.push({id:e.id, firstName:e.firstName, lastName: e.lastName})
            }
          })
          setCurrentEmployees(arr)
        }
      }

     

    }

    const cleanup =()=>{
      console.log('cleanup')

      setNewProject(null)
      setAvailableEmployees([])
      setCurrentEmployees([])
    }

    useEffect(() => {
      if (props.project){
      
        setNewProject(props.project)
        
        init()
      }
      return () => {
        cleanup()
      }
    }, [props])


    function handleOnSelect(x){

      let selected = availableEmployees.find(e=>e.id===x) || currentEmployees.find(e=>e.firsName === x)
      if (selected){
        let copyNewProject = newProject
        copyNewProject.employeesId.push(selected.id)
        setNewProject(copyNewProject)
      }
    }

    function handleOnDeselect(x){
      let selected = availableEmployees.find(e=>e.id===x) || currentEmployees.find(e=>e.firstName === x)
      console.log('selected...', selected)
      if (selected){
        let employees = newProject.employeesId.filter(e=>{
         return e !== selected.id
        })
        setNewProject({...newProject, employeesId:employees})
      }
    }

    if (!project) return null
    return  <Modal
            destroyOnClose
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

              <p>Employees</p>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={currentEmployees.map(e=>e.firstName)}
                onSelect={(e)=>handleOnSelect(e)}
                onDeselect={(e)=>handleOnDeselect(e)}
              >
                  {availableEmployees.map((e,i)=>{
                    return <Option key={i} value={e.id}>{e.firstName} {e.lastName}</Option>
                  })}
              </Select>
            </Modal>
}