const API = process.env.REACT_APP_API_URI;

export const getCompanies = async () => {
  const resp = await fetch(`${API}/api/companies`, { method: 'GET' }),
        data = await resp.json();
  console.log('getCompanies',data)
  return data;
};

export const getEmployeesByCompany = async (id) => {
  const resp = await fetch(`${API}/api/employee/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();
   console.log('getEmployeesByCompany',data)
  return data;
};
export const getAllEmployees = async ()=>{
    const resp = await fetch(`${API}/api/employee`, { method: 'GET' }),
          data = await resp.json();
      console.log('getAllEmployees', data)
    return data;
}

export const getCompanyAddress = async (id)=>{
  const resp = await fetch(`${API}/api/address/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();
        console.log('getCompanyAddress', data)
  return data;
}

export const getCompanyProjects = async (id)=>{
  const resp = await fetch(`${API}/api/projects/${id}`, { method: 'GET' }),
        data = await resp.json();
        console.log('getCompanyProjects', data)

  return data;
}

export const getEmployeeDetails = async (id)=>{
  const resp = await fetch(`${API}/api/employee/${id}`, { method: 'GET' }),
        data = await resp.json();
        console.log('getEmployeeDetails', data)
  return data;
}

export const getCompanyDetails = async (id)=>{
      const resp = await fetch(`${API}/api/companies/${id}`, { method: 'GET' }),
            data = await resp.json();
            console.log('getCompanyDetails', data)
      return data;
}

export const getAllProjects = async (id)=>{
  const resp = await fetch(`${API}/api/projects/`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const putProject = async (project) =>{
      const body = {
            projectID: project.id,
            projectName: project.content,
            employees: project.employeesId
      }
      console.log('body...', body)
      const resp = await fetch(`${API}/api/projects/update_project`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body) 
        }),
        data = await resp.json();
      console.log('putProject', data)
      return data;
}