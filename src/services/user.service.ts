import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user';
 
@Injectable()
export class UserService {
 
    private userListRef = this.db.list<User>('user');
 
    constructor(private db: AngularFireDatabase) { }
 
    getUserList() {
        return this.userListRef;
    }
 
    addUser(user: User) {
        return this.userListRef.push(user);
    }
 
    /*updateUser(user: User) {
        return this.userListRef.update(user.key, user);
    }
 
    removeUser(user: User) {
        return this.userListRef.remove(user.key);
    }*/
}