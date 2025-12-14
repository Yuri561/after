
const API_URL = import.meta.env.VITE_API_URL
export const sendToVault = async (fileName: string) => {
    try{
        const response = await fetch(`${API_URL}/api/vault/upload`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ fileName })
        })
        if (!response.ok){
            throw new Error(`unable to send file to vault ${response.status}`)
        }
        const vaultResponse = await response.json()
        return vaultResponse
    }
    catch (error){
        console.error('error reaching endpoint:', error)
    }
    
}