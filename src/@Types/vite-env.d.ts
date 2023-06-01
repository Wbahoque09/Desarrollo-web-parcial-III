/// <reference types="vite/client" />


interface ImportMetaEnv {
    VITE_FIREBASE_APIKEY: string;
    VITE_FIREBASE_AUTHDOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}