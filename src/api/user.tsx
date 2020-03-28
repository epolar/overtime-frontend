import Api from './api'
import { User } from '../models/user'

export default class UserApi {

    api: Api;

    constructor() {
        this.api = new Api()
    }

    all() {
        return this.api.get('/user/all').then((response) => {
            // 将json型的response转为 User[] 
            let users: User[] = Array.from(response)
            return users
        })
    }
}