import createApiClient from "./api.service";

class BorrowedBookService {
    constructor(baseUrl = "/api/borrowedbooks") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async approve(id) {
        return (await this.api.post(`/approve/${id}`)).data;
    }
    async return(id) {
        return (await this.api.post(`/return/${id}`)).data;
    }
}

export default new BorrowedBookService();