import * as admin from 'firebase-admin'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { getConnection } from 'typeorm';
import { FirebaseAdmin } from '../../loaders/Firebase';

import { UserProfile } from '../../models/User.entity';



// firebase gmail initiation doing from front end
// after that they call to server to verify is created and
// we also if need add to server we will do in this step
export const firebaseSignIn = async (authorization: string) => {
  // Extract token from request
  let token = getFirebaseToken(authorization);
  let claims: DecodedIdToken = await asyncFetchUserInfo_fromFireBase(token);
  if (claims && claims.user_id) {
    let userRepository = getConnection().getRepository(UserProfile);
    let isAvailable = await userRepository.findOne({ where: { userid: claims.user_id } });
    if (!isAvailable) {
      let newUser = new UserProfile();
      newUser.userid = claims.user_id;
      newUser.firstname = claims.firest_name;
      newUser.lastname = claims.last_name;
      newUser.emailid = claims.emailid;
      newUser.roles = 'user';
      // we can more details get and store to database
      await userRepository.save(newUser);
    }
    await updateCustomClaims_toFireBase(claims.user_id, claims);

  }
  return { user_id: claims.user_id };

}

// in each api call we use this function for given auth iis valid or not 
export const validateFireBaseJwt = async (authorization: string): Promise<DecodedIdToken> => {
  let token = getFirebaseToken(authorization)
  var claims = await asyncFetchUserInfo_fromFireBase(token);
  return claims;

}

const getFirebaseToken = (authorization: string) => {

  if (authorization.startsWith("Bearer ")) {
    let token = authorization.substring(7, authorization.length);
    return token
  }
  return authorization;
}



async function asyncFetchUserInfo_fromFireBase(refreshToken: string): Promise<admin.auth.DecodedIdToken> {
  var idToken = refreshToken;
  if (!FirebaseAdmin) throw new Error('firebase App not initialized')
  let claims: admin.auth.DecodedIdToken = await FirebaseAdmin?.auth().verifyIdToken(idToken);
  return claims;

}


async function updateCustomClaims_toFireBase(uid: string, claims: Object) {
  //setCustomUserClaims(uid, {foo: 'bar', key1: 'value1'})
  var x = await FirebaseAdmin?.auth().setCustomUserClaims(uid, { "custom_claims": claims });
  return x
}



