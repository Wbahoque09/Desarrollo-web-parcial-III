import { injectable, inject } from "inversify";
import { IocServices } from "../Config/iocTypeConfig";
import { FirebaseAuthService } from "./FirebaseAuthService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInBase } from "../Models/SignInModel";
import { UserCredentials } from "../Models/UserCredentialsModel";

@injectable()
export default class SignInBaseService {
    constructor(
        @inject(IocServices.FirebaseAuth)
        private readonly _firebaseAuthService: FirebaseAuthService
    ) { }

    public run = async (data: SignInBase): Promise<UserCredentials> => {
        const userCredential = await signInWithEmailAndPassword(
            this._firebaseAuthService.auth,
            data.email,
            data.password
        );

        return {
            email: data.email,
            fullname: userCredential.user.displayName as string,
            id: userCredential.user.uid,
        };
    };
}
