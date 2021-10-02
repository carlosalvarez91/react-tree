/**
 * Retrieve companies list
 *
 * @return {object} Array containing company objects
*/
export const getCompanies = async () => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/companies`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

export const getEmployeesByCompany = async (id) => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/employee/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};
export const getAllEmployees = async ()=>{
    const API = process.env.REACT_APP_API_URI;
    const resp = await fetch(`${API}/api/employee`, { method: 'GET' }),
          data = await resp.json();
    return data;
}

export const getCompanyAddress = async (id)=>{
  const API = process.env.REACT_APP_API_URI;
  const resp = await fetch(`${API}/api/address/by_company/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getCompanyProjects = async (id)=>{
  const API = process.env.REACT_APP_API_URI;
  const resp = await fetch(`${API}/api/projects/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getEmployeeDetails = async (id)=>{
  const API = process.env.REACT_APP_API_URI;
  const resp = await fetch(`${API}/api/employee/${id}`, { method: 'GET' }),
        data = await resp.json();
  return data;
}

export const getAllProjects = async (id)=>{
  const API = process.env.REACT_APP_API_URI;
  const resp = await fetch(`${API}/api/projects/`, { method: 'GET' }),
        data = await resp.json();
  return data;
}
