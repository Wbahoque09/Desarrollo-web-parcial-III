import UserEntity from "../Entities/UserEntity";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export class UserConverter {
  static toFirestore = (user: UserEntity): DocumentData => {
    return {
      first_name: user.first_name,
      second_name: user.second_name,
      first_lastname: user.first_lastname,
      second_lastname: user.second_lastname,
      address: user.address,
      email: user.email,
      cell_phone: user.cell_phone,
      dni: user.dni,
      birth_date: user.birth_date,
      type_user: user.type_user,
    };
  };

  static fromFirestore = (
    snapshot: QueryDocumentSnapshot<DocumentData>
  ): UserEntity => {
    const data = snapshot.data();
    return new UserEntity({
      id: snapshot.id,
      first_name: data.first_name,
      second_name: data.second_name,
      first_lastname: data.first_lastname,
      second_lastname: data.second_lastname,
      address: data.address,
      email: data.email,
      cell_phone: data.cell_phone,
      dni: data.dni,
      birth_date: data.birth_date,
      type_user: data.type_user,
    });
  };
}
