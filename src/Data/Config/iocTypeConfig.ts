export const IocType = Object.freeze({
    FirebaseEnv: Symbol("FirebaseEnv"),
})

export const IocServices = Object.freeze({
    Firebase: Symbol("Firebase"),
    Firestore: Symbol("Firestore"),
    FirebaseAuth: Symbol("FirebaseAuth"),
    SignUpBase: Symbol("SignUpBase"),
    SignUpBaseValidator: Symbol("SignUpBaseValidator"),
    SignInBase: Symbol("SignInBase"),
    SignInBaseValidator: Symbol("SignInBaseValidator"),
    BookFormValidator: Symbol("BookFormValidator"),
    UpdateBookValidator: Symbol("UpdateBookValidator"),
    Auth: Symbol("Auth"),
})

export const IocRepositories = Object.freeze({
    User: Symbol("User"),
    Book: Symbol("Book")
})

export const IocUseCases = Object.freeze({
    RegisterUser: Symbol("RegisterUser"),
    SignInBase: Symbol("SignInBase"),
    RegisterBook: Symbol("RegisterBook"),
    UpdateBook: Symbol("UpdateBook"),
    ListBook: Symbol("ListUpdate"),
    DeleteBook: Symbol("DeleteBook")
})

export const IocViewModel = Object.freeze({
    SignIn: Symbol("SignIn"),
    SignUp: Symbol("SignUp"),
    Admin: Symbol("Admin")
})

export const IocStores = Object.freeze({
    Auth: Symbol("AuthStore")
})