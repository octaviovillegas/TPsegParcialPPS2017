import { Injectable  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {firebaseconfig} from '../pages/firebase/firebase-config';
import {AngularFireModule} from 'angularfire2';

@Injectable()
export class AuthData {

    fireAuth: any;
    userToken: any;

    constructor (public afAuth: AngularFireAuth) {

        /*afAuth.authState.subscribe( user => {
            if (user) {
                this.fireAuth = user;
                console.log(user);
            }
        });*/

    }

    loginUser (newEmail: string, newPassword: string): firebase.Promise<any> {

        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);

    }

    loginWithGithub () {
        var provider = new firebase.auth.GithubAuthProvider();

        return this.afAuth.auth.signInWithRedirect(provider);

    }

    resetPassword (email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any> {
        this.userToken = {};
        return this.afAuth.auth.signOut();
    }

    signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        var secondaryApp = firebase.initializeApp(firebaseconfig, "users-app");
        return secondaryApp.auth().createUserWithEmailAndPassword(newEmail, newPassword);
    }

    updateUserNombre(nombre: string): firebase.Promise<any> {

        let user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: nombre,
            photoURL: ''
        });

    }

    removeCurrentUser() {

        let user = firebase.auth().currentUser;

        return user.delete();

    }

}
