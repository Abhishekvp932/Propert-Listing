export const API_ROUTES = {
    sigup:'/api/auth/signup',
    login:'/api/auth/login',
    createProperty:"/api/property/add",
    getUserProperties:(userId:string)=> `/api/property/user-properties/${userId}`,
    getAllProperties:'/api/property/all',
    getSingleProperty:(propertyId:string)=>`/api/property/${propertyId}`,
    deleteProperty:(propertyId:string)=>`/api/property/${propertyId}`,
}