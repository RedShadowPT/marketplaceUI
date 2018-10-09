import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})

export class UsersAdminComponent implements OnInit {
  @ViewChild('newUserForm') userForm: NgForm;

  backendUsers = null;
  serverMessage = '';
  _editUser = {
    displayName: '',
    email: '',
    password: '',
    isAdmin: false,
    isEnabled: false,
    willEdit: false
  };
  _deleteUser = {
    displayName: '',
    email: '',
    password: '',
    isAdmin: false,
    isEnabled: false
  };

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.clearForm();
    this.userService.getUsers()
      .subscribe(response => {
        this.backendUsers = response;
      });
  }

  editUser(user) {
    this._editUser = user;
    this._editUser.willEdit = true;
  }

  deleteUser(user) {
    this._deleteUser = user;
    this.userForm.reset();
  }

  clearForm() {
    this._editUser = {
      displayName: '',
      email: '',
      password: '',
      isAdmin: false,
      isEnabled: false,
      willEdit: false
    };
    this._deleteUser = {
      displayName: '',
      email: '',
      password: '',
      isAdmin: false,
      isEnabled: false
    };
    this.userForm.reset();
  }

  onSave(newUserForm: NgForm) {
    this._deleteUser = {
      displayName: '',
      email: '',
      password: '',
      isAdmin: false,
      isEnabled: false
    };
    console.log(newUserForm.value);
    if (newUserForm.value) {
      this.userService.createUser(newUserForm.value)
        .subscribe(respose => {
          this.serverMessage = respose.message;
          this.ngOnInit();
        });
    }

  }

  onDelete(userData) {
    this.userService.deleteUser(userData)
      .subscribe(respose => {
        this.serverMessage = respose.message;
        this.ngOnInit();
      });
  }
}
