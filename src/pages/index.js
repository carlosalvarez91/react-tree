import { useEffect, useState, useContext } from 'react';
import { getCompanies, getEmployeesByCompany, getAllEmployees, getCompanyAddress, getCompanyProjects, getEmployeeDetails, getAllProjects } from '../services/global';
import { Col, Row } from 'antd';
import CardComponent from '../components/CardComponent';
import { CardInfoContext } from '../context/CardInfoContext';
import {CaretDownOutlined, CaretRightOutlined} from '@ant-design/icons'


export default function Home() {
  const [employeesGroupedByJobArea, setEmployeesGroupedByJobArea] = useState(null)
  const {setCardInfo} = useContext(CardInfoContext)
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [employees, setEmployees] = useState([])
  const [selectedJobArea, setSelectedJobArea] = useState(null)

  const init = () =>{
    getCompanies().then((data) => {
      setCompanies(data)
      }
    );
  }

  useEffect(() => {
    init()
  }, []);

  let payload = {type: null, cardTitle: null, contentGroups: {}}

  const handleClickOnEmployee = (key) =>{
    /*
    When the user clicks on an employee's name 
    you will need to show the employee's details, 
    and projects they're part of.
    */

    getEmployeeDetails(key).then(data=>{
      payload.cardTitle = `Employee`
      payload.contentGroups.group_1 ={
        key: 'Employee Details',
        content: [
          {
            label: 'Employee Name',
            content: `${data.firstName} ${data.lastName}`
          },
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
      setCardInfo(payload)
    })
  }

  const handleClickJobArea = (jobArea, company)=>{
    setSelectedJobArea(jobArea.key)
    setEmployees(jobArea.employees)
    /*
    Clicking on Employee's job area should only display 
    how many employees work in that area, 
    and the number of projects they participate in.
    */
    let totalEmployees = jobArea.employees.length
    getCompanyProjects(company.id).then(data=>{
      payload.cardTitle = 'Job Area'
      payload.contentGroups.group_1 ={
        key: 'Job Area info',
        content: [
          {
            label: 'Job Area ',
            content: jobArea.title
          },
          {
            label: 'Total employees',
            content: totalEmployees
          },
          {
            label: 'Number of projects',
            content: data.length
          }
        ]
      }
      setCardInfo(payload)
    })
  }

  const handleClickCompany =(c)=>{
    setSelectedCompany(c.id)
    getEmployeesByCompany(c.id).then(data=>{
 
      const jobAreas = [...new Map(data.map(item =>
        [item['jobArea'], item])).values()].map(e=>{
          return {title:e.jobArea, key:`${c.id}-${e.jobArea}`, type:'jobArea'}
        });

      getAllEmployees().then(allEmployeesResponse=>{

        let jobAreasWithEmployees = jobAreas.map(j=>{
          j.employees= allEmployeesResponse.filter(e=>{
            return e.jobArea === j.title && e.companyId === c.id

          }).map((x,i)=>{
            return {title:x.firstName,
                    key:x.id,
                    isLeaf: true,
                    type:'employee'
                  }
          })
          return j
        })
        console.log(jobAreasWithEmployees)
        setEmployeesGroupedByJobArea(jobAreasWithEmployees)
      })
    })

    /*
    When the user clicks on a company, 
    the app should display the company's address and the company's projects. 
    It should be possible to visualize the information about each project. 
    If you feel that this is too easy, 
    add the ability to edit project details (changing the project name)
    and assigning & removing employees from a project.    
    */

      payload.cardTitle = 'Company'
      getCompanyAddress(c.id).then(data=>{
          payload.contentGroups.group_1 = {
            key: 'Company info',
            content: [
              {
                label: 'Name',
                content: c.name
              },
              {
                label: 'Address',
                content: `${data.street} ${data.city}, ${data.state} ${data.state}`
              }
            ]
          }
        })
        getCompanyProjects(c.id).then(data=>{
          console.log('getCompanyProjects....', data)
          payload.contentGroups.group_2 = {
            key: 'Company projects',
            content: data.map(e=>{
              return {
                label: 'Project',
                content: e.name,
                id: e.id,
                _id:e._id,
                department: e.department
              }
            })
          }

        })

    setCardInfo(payload)
  }


  return (
    <Row>
      <Col span={6} style={{padding:'4rem'}}>

      {companies.map(e=>{
        return <div key={e.id}><p onClick={()=>{
            handleClickCompany(e)
        }}> {selectedCompany === e.id ? <CaretDownOutlined/>: <CaretRightOutlined />} {e.name}</p>
        {
          selectedCompany === e.id && employeesGroupedByJobArea && employeesGroupedByJobArea.map((j,i)=>{
            return <div key={i} style={{marginLeft:20}}>
                    <p onClick={()=>handleClickJobArea(j,e)}>{selectedJobArea === j.key ? <CaretDownOutlined/>: <CaretRightOutlined />}{j.title}</p>
                    {selectedJobArea === j.key && employees && employees.map((e,x)=>{
                    return <p style={{marginLeft:20}}key={x} onClick={()=>{
                      handleClickOnEmployee(e.key)
                    }}>{e.title}</p>
                    })}
                  </div>
          })

        }
        </div>
      })}


      </Col>
      <Col span={18}>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding:'4rem' }}>
          <CardComponent/>
      </div>
      </Col>
    </Row>
  )
}