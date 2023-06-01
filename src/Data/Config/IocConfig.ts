import { Container } from "inversify";
import { IocRepositories, IocServices, IocStores, IocType, IocUseCases, IocViewModel } from "./iocTypeConfig";
import { FirebaseEnv } from "../Envs/FirebaseConfig";
import { FirebaseService } from "../Services/FirebaseService";
import { FirestoreService } from "../Services/FIrestoreService";
import { FirebaseAuthService } from "../Services/FirebaseAuthService";
import { SignUpBaseService } from "../Services/SignUpBaseService";
import { UserRepositoryImpl } from "../Repositories/UserRepositoryImpl";
import { BookRepositoryImpl } from "../Repositories/BookRepositoryImpl";
import { RegisterUserUseCase } from "../UseCases/RegisterUserUseCase";
import { SignUpBaseValidatorService } from "../Services/Validator/SignUpBaseValidatorService";
import { SignInBaseValidatorService } from '../Services/Validator/SignInBaseValidatorService';
import SignInBaseService from "../Services/SignInBaseService";
import { SignInBaseUserUseCase } from "../UseCases/SignInBaseUserUseCase";
import { SignUpViewModel } from "../../UI/Pages/Public/SignUp/ViewModel";
import { SignInViewModel } from "../../UI/Pages/Public/SignIn/ViewModel";
import { AuthStore } from "../Store/AuthStore";
import AuthService from "../Services/AuthService";
import { AdminViewModel } from "../../UI/Pages/Private/Admin/ViewModel";
import { BookFormValidatorService } from "../Services/Validator/BookFormValidatorService";
import { RegisterBookUseCase } from "../UseCases/RegisterBookUseCase";
import { UpdateBookUseCase } from "../UseCases/UpdateBookUseCase";
import { ListBookUseCase } from "../UseCases/ListBookUseCase";
import { DeleteBookUseCase } from "../UseCases/DeleteBookUseCase";

const container = new Container();

container
  .bind<FirebaseEnv>(IocType.FirebaseEnv)
  .to(FirebaseEnv)
  .inSingletonScope();

// Services
container
  .bind<FirebaseService>(IocServices.Firebase)
  .to(FirebaseService)
  .inSingletonScope();

container
  .bind<FirebaseAuthService>(IocServices.FirebaseAuth)
  .to(FirebaseAuthService)
  .inSingletonScope();

container
  .bind<FirestoreService>(IocServices.Firestore)
  .to(FirestoreService)
  .inSingletonScope();

container
  .bind<SignUpBaseService>(IocServices.SignUpBase)
  .to(SignUpBaseService);

container
  .bind<SignUpBaseValidatorService>(IocServices.SignUpBaseValidator)
  .to(SignUpBaseValidatorService);

container
  .bind<SignInBaseService>(IocServices.SignInBase)
  .to(SignInBaseService);

container
  .bind<SignInBaseValidatorService>(IocServices.SignInBaseValidator)
  .to(SignInBaseValidatorService)

container
  .bind<BookFormValidatorService>(IocServices.BookFormValidator)
  .to(BookFormValidatorService)

container.bind<AuthService>(IocServices.Auth).to(AuthService)

//Repository
container
  .bind<UserRepositoryImpl>(IocRepositories.User)
  .to(UserRepositoryImpl);

container
  .bind<BookRepositoryImpl>(IocRepositories.Book)
  .to(BookRepositoryImpl);


// Use cases
container
  .bind<RegisterUserUseCase>(IocUseCases.RegisterUser)
  .to(RegisterUserUseCase);

container
  .bind<SignInBaseUserUseCase>(IocUseCases.SignInBase)
  .to(SignInBaseUserUseCase)

container
  .bind<RegisterBookUseCase>(IocUseCases.RegisterBook)
  .to(RegisterBookUseCase)

container
  .bind<UpdateBookUseCase>(IocUseCases.UpdateBook)
  .to(UpdateBookUseCase)

container
  .bind<ListBookUseCase>(IocUseCases.ListBook)
  .to(ListBookUseCase)

container
  .bind<DeleteBookUseCase>(IocUseCases.DeleteBook)
  .to(DeleteBookUseCase)

// View Model
container
  .bind<SignUpViewModel>(IocViewModel.SignUp)
  .to(SignUpViewModel)

container
  .bind<SignInViewModel>(IocViewModel.SignIn)
  .to(SignInViewModel)

container
  .bind<AdminViewModel>(IocViewModel.Admin)
  .to(AdminViewModel)

// Stores
container
  .bind<AuthStore>(IocStores.Auth)
  .to(AuthStore)


export default container;
