import Swal from "sweetalert2"
import { action, makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";
import { IocUseCases } from "../../../../Data/Config/iocTypeConfig";
import { RegisterUserUseCase } from "../../../../Data/UseCases/RegisterUserUseCase";
import { SignUpBaseData } from "../../../../Data/Models/SignUpModel";
import UserEntity from "../../../../Data/Entities/UserEntity";

@injectable()
export class SignUpViewModel {
    @observable public isLoading: boolean = false;

    constructor(
        @inject(IocUseCases.RegisterUser)
        private _registerUserUseCase: RegisterUserUseCase
    ) {
        makeObservable(this)
    }

    @action
    public register = async (data: SignUpBaseData): Promise<UserEntity | null> => {
        try {
            this.isLoading = true;
            return await this._registerUserUseCase.run(data)
        } catch (error) {
            Swal.fire("Error", (error as Error).message, 'error')
        } finally {
            this.isLoading = false;
        }

        return null;
    }
}