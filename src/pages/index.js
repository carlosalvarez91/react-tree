import { useEffect, useState, useContext } from 'react';
import { getCompanies, getEmployeesByCompany, getAllEmployees, getCompanyAddress, getCompanyProjects, getEmployeeDetails, getAllProjects } from '../services/global';
import { Tree, Col, Row } from 'antd';
import CardComponent from '../components/CardComponent';
import { CardInfoContext } from '../context/CardInfoContext';

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }

    return node;
  });
}


export default function Home() {
  const [treeData, setTreeData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null)
  const [employeesGroupedByJobArea, setEmployeesGroupedByJobArea] = useState(null)
  const {setCardInfo} = useContext(CardInfoContext)

  const onSelectNode = (obj) =>{

    console.log('onSelectNode...', onSelectNode)

    let payload = {type: obj.node.type, cardTitle: null, contentGroups: {}}

    // example 
    // {type: obj.node.type, contentGroups: {
    //  {key: group1, content:[{project}, {project}]},
    //  {key: group2, [{address}]}
    // }}
    //

    /*
    When the user clicks on a company, the app should display the company's address and the company's projects. It should be possible to visualize the information about each project. If you feel that this is too easy, add the ability to edit project details (changing the project name) and assigning & removing employees from a project.    
    */

    if (obj.node.type && obj.node.type === 'company'){

      payload.cardTitle = obj.node.name
      
        getCompanyAddress(obj.node.id).then(data=>{
          payload.contentGroups.group_1 = {
            key: 'Company info',
            content: [
              {
                label: 'Address',
                content: `${data.street} ${data.city}, ${data.state} ${data.state}`
              }
            ]
          }
        })
        getCompanyProjects(obj.node.id).then(data=>{
          payload.contentGroups.group_2 = {
            key: 'Company projects',
            content: data.map(e=>{
              return {label: 'Project', content: e.name}
            })
          }
          
        })
    }

    /*
    Clicking on Employee's job area should only display how many employees work in that area, and the number of projects they participate in.
    */
    if (obj.node.type && obj.node.type === 'jobArea'){
      //let totalEmployees = employeesGroupedByJobArea.children.length
      getAllProjects().then(data=>{
        //console.log(data)
      })
    }
    /*
    When the user clicks on an employee's name 
    you will need to show the employee's details, 
    and projects they're part of.
    */
    if (obj.node.type && obj.node.type === 'employee'){


      getEmployeeDetails(obj.node.key).then(data=>{
        payload.cardTitle = `${data.firstName} ${data.lastName}`
        payload.contentGroups.group_1 ={
          key: 'Employee Details',
          content: [
            {
              label: 'Job title',
              content: data.jobTitle
            },
            {
              label: 'Job Area',
              content: data.jobArea,
            },
            {
              label: 'Job Type',
              content:data.jobType
            }
          ]
        }
      })
    }

    console.log('payload.............', payload)
    setCardInfo(payload)

  }


  const init = () =>{

    getCompanies().then((data) => setTreeData(data.map(e=>{
      e.key=e.id
      e.title=e.name
  
      e.type='company'
      return e
    })));
  }

  useEffect(() => {
    init()

  }, []);

  // console.log(treeData)


  const onLoadData = ({ key, children, id }) =>
    new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }

        getEmployeesByCompany(id).then(data=>{
          let jobAreas = data.map((e,i)=>{
            console.log('...e....',e)
            return {title:e.jobArea, key:`${id}-${e.jobArea}`, type:'jobArea'}
          })

          getAllEmployees().then(allEmployeesResponse=>{

            let jobAreasWithEmployees = jobAreas.map(j=>{
              //j.selectable= false
              j.children= allEmployeesResponse.filter(e=>{
                return e.jobArea === j.title && e.companyId === id

              }).map((x,i)=>{
                return {title:x.firstName,
                        key:x.id,
                        isLeaf: true,
                        type:'employee'
                      }
              })
              return j
            })

            setEmployeesGroupedByJobArea(jobAreasWithEmployees)

            setTreeData((origin) =>
            updateTreeData(origin, key, jobAreasWithEmployees),
          );

          resolve()
          })
        })
    });

  console.log('treeData...',treeData)

  return (
    <Row>
      <Col span={6} style={{padding:'4rem'}}>
      <Tree onSelect={(e,n)=>onSelectNode(n)} loadData={onLoadData} treeData={treeData} />
      </Col>
      <Col span={18}>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding:'4rem' }}>
          <CardComponent/>
      </div>
      </Col>
    </Row>
  )
}