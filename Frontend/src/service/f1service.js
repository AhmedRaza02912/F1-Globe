const API_BASE_URL = "http://localhost:5283/api/f1";


export async function getActiveCircuits(season = 2026){
    const response = await fetch(
        `${API_BASE_URL}/active-circuits/${season}`
    );

    if(!response.ok){
        throw new Error("Failed to fetch circuits");     
    }
     return await response.json();
}