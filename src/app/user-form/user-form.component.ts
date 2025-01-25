import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/assets/services/user.service';
interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  preserveWhitespaces:true
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,private userservice:UserService) {
    
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }
  private loadUsers() {
   
    this.dataSource.data = this.userservice.getUsers();
  }
  ngOnInit() {
this.loadUsers();
}
addUsers() {
  const user: User = this.userForm.value;
  this.userservice.addUser(user);
  this.loadUsers();
 
}
deleteUsers(user: any): void {
  this.userservice.deleteUser(user);
  this.dataSource.data = this.dataSource.data.filter(u => u !== user);
}
}