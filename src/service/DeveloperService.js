import axios from "axios";

let URL = "http://localhost:8080/api/v1/developers"

export default class DeveloperService{
  
    createDeveloper(developer) {
        console.log("Create Developer");

        return axios.post(URL, developer);
    }

    getDevelopers() {
        return axios.get(URL);
    }

    getDeveloper(id) {
        return axios.get(URL + "/" + id);
    }

    updateDeveloper(id, developer) {
        return axios.put(URL + "/" + id, developer);
    }

    deleteDeveloper(id) {
        console.log("Delete Developer");
        return axios.delete(URL + "/" + id);
    }
}
