import { Injectable } from '@angular/core';
interface User {
  name: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
private localStorekey = "users"
  constructor() { }
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorekey, JSON.stringify(users));
  }
  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }


  
  getUsers(){
    const users = localStorage.getItem(this.localStorekey);
    return users ? JSON.parse(users) : [];
  }
  deleteUser(user: User): void {
    const users = this.getUsers();
    const updatedUsers = users.filter(
      (u:any) => u.email !== user.email || u.role !== user.role
    );
    this.saveUsers(updatedUsers);
  }
  editUser(updatedUser: User): void {
    let users = this.getUsers();
    users = users.map((user:any) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    this.saveUsers(users);
  }
}
