
export class ApiService {

    // API endpoint
    static getEndPoint = () => {
        return "https://demo7242716.mockable.io/products";
    }

    // Method to call the api to search products
    static searchProducts = async () => {
        try {
            const response = await fetch(this.getEndPoint());
            return response.json();
        } catch (error) {
            console.log("Error ApiService searchProducts", error)
            throw error
        }
    }
}