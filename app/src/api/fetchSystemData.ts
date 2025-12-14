// here we are going to fetch our system data

const API_URL = import.meta.env.VITE_API_URL
export const fetchSystemData = async () => {
    try{
        const response = await fetch(`${API_URL}/api/system/load`, {
            headers: {
                "Content-type": "application/json"
            }
        })
        if (!response.ok){
            throw new Error(`unable to retrieve data ${response.status}`)
        }
        const systemData = await response.json()
        return systemData
    }
    catch (error){
        console.error('error reaching endpoint:', error)
    }
    
}

