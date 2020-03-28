import Api from './api'

export default class OvertimeApi {

    api!: Api

    constructor() {
        this.api = new Api()
    }

    joinToday(userID: number) {
        return this.api.post("/overtime/join", { user_id: userID })
    }

    todayList() {
        return this.api.get("/overtime/today")
    }
}