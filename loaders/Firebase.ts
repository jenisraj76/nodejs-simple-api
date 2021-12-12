import * as admin from 'firebase-admin'
import { Firebase } from '../config/Firebase';
export var FirebaseAdmin: admin.app.App | null = null;

export const initializeFirebaseApp = async () => {
    FirebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: Firebase.client_email,
            privateKey: Firebase.private_key,
            projectId: Firebase.project_id,
        }),
        databaseURL: `https://${Firebase.project_id}.firebaseio.com`,
        projectId: Firebase.project_id,
        serviceAccountId: Firebase.client_email,
    });
}