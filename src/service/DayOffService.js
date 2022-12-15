import axios from "axios";

let URL = "http://localhost:8080/api/v1/daysOff"


export default class DayOffService {

    createDayOff(dayOff) {
        console.log("Create DayOff");

        return axios.post(URL, dayOff);
    }

    getDayOffs() {
        return axios.get(URL);
    }

    getDayOff(id) {
        return axios.get(URL + "/" + id);
    }

    updateDayOff(id, dayOff) {
        return axios.put(URL + "/" + id, dayOff);
    }

    deleteDayOff(id) {
        console.log("Delete Dayoff");
        return axios.delete(URL + "/" + id);
    }
}
