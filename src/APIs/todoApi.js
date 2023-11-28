import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const getTodosAPI = async () => {

    try {
        const url = `${baseURL}/todos`
        const response = await axios.get(url)
        return response.data
    }
    catch (error) {
        return {
            error: true,
            message: `Failed to fetch data for all pokemon. Please try again later.`,
            originalError: error,
        };
    }
}