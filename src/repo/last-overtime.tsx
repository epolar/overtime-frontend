import { User } from "../models/user";

export default class LastOvertime {

    key = "last_overtime_user"

    set(user: User) {
        localStorage.setItem(this.key, JSON.stringify(user))
    }

    del() {
        localStorage.removeItem(this.key)
    }

    get(): User | undefined {
        var str = localStorage.getItem(this.key)
        if (str === null) {
            return undefined
        }
        var user: User
        user = JSON.parse(str)
        return user
    }
}