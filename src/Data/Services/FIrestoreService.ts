import { inject, injectable } from "inversify";
import { IocServices } from "../Config/iocTypeConfig";
import { FirebaseService } from "./FirebaseService";
import { Firestore, getFirestore } from "firebase/firestore/lite";

@injectable()
export class FirestoreService {
  private readonly _db: Firestore;

  constructor(
    @inject(IocServices.Firebase)
    private readonly _firebaseService: FirebaseService
  ) {
    this._db = getFirestore(this._firebaseService.app);
  }

  public get db(): Firestore {
    return this._db;
  }
}
