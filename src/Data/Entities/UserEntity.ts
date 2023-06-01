import { User } from "../../Domain/Entities/User";
import { TypeUser } from "../../Domain/Enum/TypeUser";

export default class UserEntity implements User {
    public id: string;
    public first_name: string;
    public second_name: string;
    public first_lastname: string;
    public second_lastname: string;
    public address: string;
    public email: string;
    public cell_phone: string;
    public dni: string;
    public birth_date: string;
    public type_user: TypeUser;

    constructor(data:UserEntity){
        this.id = data.id
        this.first_name = data.first_name
        this.second_name = data.second_name
        this.first_lastname = data.first_lastname
        this.second_lastname = data.second_lastname
        this.address = data.address
        this.email = data.email
        this.cell_phone = data.cell_phone
        this.dni = data.dni
        this.birth_date = data.birth_date
        this.type_user = data.type_user
    }



}