import { FirebaseOptions } from "firebase/app";
import { injectable } from "inversify";

const env = import.meta.env;

@injectable()
export class FirebaseEnv {
  public readonly FIREBASE_APIKEY: string;
  public readonly FIREBASE_AUTHDOMAIN: string;
  public readonly FIREBASE_PROJECT_ID: string;
  public readonly FIREBASE_STORAGE_BUCKET: string;
  public readonly FIREBASE_MESSAGING_SENDER_ID: string;
  public readonly FIREBASE_APP_ID: string;
  
  
  constructor() {
    this.FIREBASE_APIKEY = env.VITE_FIREBASE_APIKEY;
    this.FIREBASE_AUTHDOMAIN = env.VITE_FIREBASE_AUTHDOMAIN;
    this.FIREBASE_PROJECT_ID = env.VITE_FIREBASE_PROJECT_ID;
    this.FIREBASE_STORAGE_BUCKET = env.VITE_FIREBASE_STORAGE_BUCKET;
    this.FIREBASE_MESSAGING_SENDER_ID = env.VITE_FIREBASE_MESSAGING_SENDER_ID;
    this.FIREBASE_APP_ID = env.VITE_FIREBASE_APP_ID;
  }

  public getConfig(): FirebaseOptions {
    return {
      apiKey: this.FIREBASE_APIKEY,
      appId: this.FIREBASE_APP_ID,
      authDomain: this.FIREBASE_AUTHDOMAIN,
      messagingSenderId: this.FIREBASE_MESSAGING_SENDER_ID,
      projectId: this.FIREBASE_PROJECT_ID,
      storageBucket: this.FIREBASE_STORAGE_BUCKET,
    }
  }
}
