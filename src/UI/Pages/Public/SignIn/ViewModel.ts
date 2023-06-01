import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { IocUseCases } from "../../../../Data/Config/iocTypeConfig";
import { SignInBaseUserUseCase } from "../../../../Data/UseCases/SignInBaseUserUseCase";
import { SignInBase } from "../../../../Data/Models/SignInModel";
import Swal from "sweetalert2";
import UserEntity from "../../../../Data/Entities/UserEntity";

@injectable()
export class SignInViewModel {
  @observable public isLoading: boolean = false;

  constructor(
    @inject(IocUseCases.SignInBase)
    private _signInUserUseCase: SignInBaseUserUseCase
  ) {
    makeObservable(this)
  }

  @action
  public signIn = async (data: SignInBase): Promise<UserEntity | null> => {
    try {
      this.isLoading = true;
      return await this._signInUserUseCase.run(data)
    } catch (error) {
      Swal.fire("Error", (error as Error).message, 'error')
    } finally {
      this.isLoading = false;
    }

    return null;
  }
}
