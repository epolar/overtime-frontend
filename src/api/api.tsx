export default class Api {
    apiUrl(path: string) {
        return process.env.REACT_APP_API + path
    }

    async get(path: string) {
        const response = await fetch(this.apiUrl(path)).then(response => response.json())
        return await response
    }
    async post(path: string, data: any) {
        const response = await fetch(this.apiUrl(path), {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }).then(response => response.json())
        return await response
    }
}