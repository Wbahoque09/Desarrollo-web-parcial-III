import { TypeUser } from "../Enum/TypeUser";

export interface User {
    id: string,
    first_name: string;
    second_name: string;
    first_lastname: string;
    second_lastname: string;
    address: string;
    email: string,
    cell_phone: string;
    dni: string,
    birth_date: string;
    type_user: TypeUser
}