const API = process.env.REACT_APP_API_URI;

export const getCompanies = async () => {
  const resp = await fetch(`${API}/api/companies`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

export const getEmployeesByCompany = async (id) => {
  const resp = await fetch(`${API}/api/employee/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};
export const getAllEmployees = async ()=>{
    const resp = await fetch(`${API}/api/employee`, { method: 'GET' }),
          data = await resp.json();
    return data;
}

export const getCompanyAddress = async (id)=>{
  const resp = await fetch(`${API}/api/address/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getCompanyProjects = async (id)=>{
  const resp = await fetch(`${API}/api/projects/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getEmployeeDetails = async (id)=>{
  const resp = await fetch(`${API}/api/employee/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getAllProjects = async (id)=>{
  const resp = await fetch(`${API}/api/projects/`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const putProject = async (project) =>{
      console.log('................',project)
          /*
            {
            projectID: "8faa447c-3cf5-49c7-92a9-14c2c0a453eb",
            projectName: "Handcrafted Frozen Shoes",
            employees: [
              "73591378-6602-4338-a110-b9ad8b032e27"
              "c7fff585-2f9b-4164-94f0-6552dbeeeb04"
              "26e44cf2-cf3c-4ac9-b331-c87c9dfd07cf"
            ]
          }
          */
      const body = {
            projectID: project.id,
            projectName: project.content,
            employees: []
      }
      console.log('................',body)
      const resp = await fetch(`${API}/api/projects/update_project/`, {
            method: 'PUT',
            body
        }),
        data = await resp.json();
      return data;
}