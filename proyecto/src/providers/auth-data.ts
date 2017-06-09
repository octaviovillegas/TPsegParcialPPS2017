import { Injectable  } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthData {

    fireAuth: any;

    constructor (public af: AngularFire) {

        af.auth.subscribe( user => {
            if (user) {
                this.fireAuth = user.auth;
                console.log(user);
            }
        });

    }

    loginUser (newEmail: string, newPassword: string): firebase.Promise<any> {

        return this.af.auth.login({
            email : newEmail,
            password : newPassword
        }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        });

    }

    resetPassword (email: string): firebase.Promise<any> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any> {
        return this.af.auth.logout();
    }

    signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
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
