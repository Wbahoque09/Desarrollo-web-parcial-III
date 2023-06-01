import { inject, injectable } from "inversify";
import { User } from "../../Domain/Entities/User";
import { IocRepositories, IocServices } from "../Config/iocTypeConfig";
import type { UserRepository } from "../../Domain/Repositories/UserRepository";
import { SignInBaseValidatorService } from "../Services/Validator/SignInBaseValidatorService";
import SignInBaseService from "../Services/SignInBaseService";
import { SignInBase } from "../Models/SignInModel";

@injectable()
export class SignInBaseUserUseCase {
  constructor(
    @inject(IocServices.SignInBase)
    private readonly _signInBaseService: SignInBaseService,
    @inject(IocServices.SignInBaseValidator)
    private readonly _signInBaseValidatorService: SignInBaseValidatorService,
    @inject(IocRepositories.User)
    private readonly _userRepository: UserRepository
  ) { }

  public run = async (form: SignInBase): Promise<User | null> => {

    this._signInBaseValidatorService.run(form);

    const userCredential = await this._signInBaseService.run(form)

    return await this._userRepository.getUser(userCredential.id)
  };
}
