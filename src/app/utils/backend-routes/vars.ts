
const apiUrl = 'http://localhost:3001'

export const server = {
   api: {
    base: apiUrl,
    auth: {
        base:            apiUrl + `/auth`,
        login:           apiUrl + `/auth/login`,
        register:        apiUrl + `/auth/signin`,
        logout:          apiUrl + `/auth/logout`,
        refreshRotation: apiUrl + `/auth/refresh-rotation`,
    }
   }
}