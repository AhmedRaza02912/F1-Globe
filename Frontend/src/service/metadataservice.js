export async function getCircuitMetadata(circuitId) {
    const response = await fetch(
        `${API_BASE_URL}/metadata/${circuitId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch metadata");
    }

    return await response.json();
}