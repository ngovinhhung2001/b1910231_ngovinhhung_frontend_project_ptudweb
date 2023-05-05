import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "http://localhost:3000/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signOut() {
        return (await this.api.post("/signout")).data;
    }
    async get(id) {
        return (await this.api.get(`/secured/${id}`)).data;
    }
}

export default new UserService();