import { action, autorun, makeObservable, observable } from "mobx";
import UserEntity from "../../Data/Entities/UserEntity";
import { inject, injectable } from "inversify";
import { IocRepositories, IocServices } from '../../Data/Config/iocTypeConfig';
import AuthService from "../../Data/Services/AuthService";
import type { UserRepository } from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import Swal from "sweetalert2";

@injectable()
export class AuthStore {
    @observable public isLoading: boolean = false;
    @observable public user: UserEntity | null = null;

    constructor(
        @inject(IocServices.Auth) private readonly _authService: AuthService,
        @inject(IocRepositories.User) private readonly _userRepository: UserRepository
    ) {
        makeObservable(this)
        autorun(() => this.loadSession())
    }

    @action
    public addAuthInformation = (user:UserEntity) => {
        this.user = user;
    }

    @action
    public logOut = () => {
        this._authService.signOut();
        this.user = null;
    }

    public get isLogged():boolean  {
        return !!this.user
    }

    @action
    public loadSession = () => {
        this.isLoading = true;
        this._authService.isAuthenticated(async (user) => {
            try {
                if (user) {
                    this.user = await this._userRepository.getUser(user.id) as User
                }
            } catch (error) {
                Swal.fire("Error", "no se pudo recuperar la session", "error")
            } finally {
                this.isLoading = false;
            }

        })
    }
}