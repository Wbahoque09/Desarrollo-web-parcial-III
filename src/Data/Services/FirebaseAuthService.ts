import { inject, injectable } from "inversify";
import { IocServices } from "../Config/iocTypeConfig";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseService } from "./FirebaseService";

@injectable()
export class FirebaseAuthService {
  private readonly _auth: Auth;
  constructor(
    @inject(IocServices.Firebase)
    private readonly _firebaseService: FirebaseService
  ) {
    this._auth = getAuth(this._firebaseService.app);
  }

  public get auth(): Auth {
    return this._auth;
  }
}
