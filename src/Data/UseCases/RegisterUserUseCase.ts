import { inject, injectable } from "inversify";
import { User } from "../../Domain/Entities/User";
import { type SignUpBaseData } from "../Models/SignUpModel";
import { SignUpBaseService } from "../Services/SignUpBaseService";
import { IocRepositories, IocServices } from "../Config/iocTypeConfig";
import { SignUpBaseValidatorService } from "../Services/Validator/SignUpBaseValidatorService";
import type { UserRepository } from "../../Domain/Repositories/UserRepository";
import UserEntity from "../Entities/UserEntity";
import { TypeUser } from "../../Domain/Enum/TypeUser";

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(IocServices.SignUpBase)
    private readonly _signUpBaseService: SignUpBaseService,
    @inject(IocServices.SignUpBaseValidator)
    private readonly _signUpBaseValidatorService: SignUpBaseValidatorService,
    @inject(IocRepositories.User)
    private readonly _userRepository: UserRepository
  ) { }

  public run = async (form: SignUpBaseData): Promise<User> => {

    this._signUpBaseValidatorService.run(form);

    const userCredential = await this._signUpBaseService.run({
      first_name: form.first_name,
      second_name: form.second_name,
      first_lastname: form.first_lastname,
      second_lastname: form.second_lastname,
      email: form.email,
      password: form.password,
    })

    return await this._userRepository.addUser(new UserEntity({
      first_name: form.first_name,
      second_name: form.second_name,
      first_lastname: form.first_lastname,
      second_lastname: form.second_lastname,
      email: form.email,
      address: form.address,
      birth_date: form.birth_date,
      cell_phone: form.cell_phone,
      dni: form.dni,
      id: userCredential.id,
      type_user: TypeUser.USER
    }))
  };
}
