
export interface User{
    name : string,
    age:string,
    phonenumber:string,
    email:string
}

export interface CustomInputProps {
    type:string,
    name:string,
    placeholder:string,
    value:string,
    onChange:(key:any,value:any) => void,
    stateKey:string
}

export {default} from './userforms';