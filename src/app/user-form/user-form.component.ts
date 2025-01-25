import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/assets/services/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  preserveWhitespaces: true
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private userservice: UserService, public dailog: MatDialog) {

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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
  openUserEdit(user: User) {
    const dialogRef = this.dailog.open(UserEditComponent, {
      width: '400px',
      data: { user: user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userservice.editUser(result);
        this.loadUsers();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}