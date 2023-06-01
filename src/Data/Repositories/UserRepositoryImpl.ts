import { inject, injectable } from "inversify";
import { User } from "../../Domain/Entities/User";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { IocServices } from "../Config/iocTypeConfig";
import { FirestoreService } from "../Services/FIrestoreService";
import { collection, doc, getDoc, getDocs, runTransaction } from "firebase/firestore/lite";
import { UserConverter } from "../Mapper/UserConverter";
import { TypeUser } from "../../Domain/Enum/TypeUser";
import { collectionNames } from "../Config/CollectionNames";

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(IocServices.Firestore)
    private readonly _firestoreService: FirestoreService
  ) { }

  getUser = async (id: string): Promise<User | null> => {
    const docSnap = await getDoc(
      doc(this._firestoreService.db, `${collectionNames.USERS}/${id}`).withConverter(UserConverter)
    );

    if (!docSnap.exists()) return null;

    return docSnap.data() as User;
  };

  addUser = async (data: User): Promise<User> => {
    return await runTransaction(
      this._firestoreService.db,
      async (transaction) => {
        const { id, ...rest } = data;
        const userRef = doc(this._firestoreService.db, `${collectionNames.USERS}/${data.id}`);

        await transaction.set(userRef, { ...rest });

        return data;
      }
    );
  };

  getUsers = async (): Promise<User[]> => {
    const querySnapshot = await getDocs(
      collection(this._firestoreService.db, collectionNames.USERS).withConverter(
        UserConverter
      )
    );

    return querySnapshot.docs.map((doc) => doc.data());
  };

  isAdmin = async (id: string): Promise<boolean> => {
    const docSnap = await getDoc(
      doc(this._firestoreService.db, `${collectionNames.USERS}/${id}`).withConverter(UserConverter)
    );

    if (!docSnap.exists()) return false;

    const data = docSnap.data();

    return data.type_user === TypeUser.ADMIN;
  };
}
