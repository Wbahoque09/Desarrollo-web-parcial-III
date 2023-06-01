import { inject, injectable } from "inversify";
import { IocServices } from "../Config/iocTypeConfig";
import { FirebaseAuthService } from "./FirebaseAuthService";
import { SignUpBase } from "../Models/SignUpModel";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserCredentials } from "../Models/UserCredentialsModel";

@injectable()
export class SignUpBaseService {
  constructor(
    @inject(IocServices.FirebaseAuth)
    private readonly _firebaseAuthService: FirebaseAuthService
  ) { }

  public run = async (data: SignUpBase): Promise<UserCredentials> => {
    const { email, password, ...rest } = data;

    const currentUser = await createUserWithEmailAndPassword(
      this._firebaseAuthService.auth,
      data.email,
      data.password
    );

    const fullName = `${rest.first_name} ${rest.second_name} ${rest.first_lastname} ${rest.second_lastname}`;

    await updateProfile(currentUser.user, {
      displayName: fullName,
    });

    return {
      email: data.email,
      fullname: fullName,
      id: currentUser.user.uid,
    };
  };
}
