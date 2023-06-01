import { injectable, inject } from "inversify";
import { IocServices } from "../Config/iocTypeConfig";
import { FirebaseAuthService } from "./FirebaseAuthService";
import { UserCredentials } from "../Models/UserCredentialsModel";

@injectable()
export default class AuthService {
  constructor(
    @inject(IocServices.FirebaseAuth)
    private readonly _firebaseAuthService: FirebaseAuthService
  ) { }

  public isAuthenticated = (fn: (user: UserCredentials | null) => void): void => {
    this._firebaseAuthService.auth.onAuthStateChanged((user) => {
      fn(user ? {
        id: user.uid as string,
        email: user.email as string,
        fullname: user.displayName as string,
      } : null)
    })
  }

  public signOut = async (): Promise<void> => {
    this._firebaseAuthService.auth.signOut();
  };
}
