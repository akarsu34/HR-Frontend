import axios from "axios";

let URL = "http://localhost:8080/api/v1/overshifts"


export default class OverShiftService {

    createOverShift(overShift) {
        console.log("Create OverShift");

        return axios.post(URL, overShift);
    }
  
    getOverShifts() {
        return axios.get(URL);
    }

    getOverShift(id) {
        return axios.get(URL + "/" + id);
    }

    updateOverShift(id, overShift) {
        return axios.put(URL + "/" + id, overShift);
    }

    deleteOverShift(id) {
        console.log("Delete OverShift");
        return axios.delete(URL + "/" + id);
    }
}