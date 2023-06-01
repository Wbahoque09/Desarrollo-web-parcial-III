import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { inject, injectable } from "inversify";
import { IocType } from "../Config/iocTypeConfig";
import { FirebaseEnv } from "../Envs/FirebaseConfig";
import "firebase/firestore";
import "firebase/auth";

@injectable()
export class FirebaseService {
  private _config: FirebaseOptions;
  private _app: FirebaseApp;

  constructor(
    @inject(IocType.FirebaseEnv) private readonly _firebaseEnv: FirebaseEnv
  ) {
    this._config = this._firebaseEnv.getConfig();
    this._app = initializeApp(this._config);;
  }

  public get app(): FirebaseApp {
    return this._app as FirebaseApp;
  }
}
