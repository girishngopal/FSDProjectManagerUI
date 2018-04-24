import { Injectable } from '@angular/core';
import { status } from './status';
import { Users } from './users';

export interface UserEdit {
  status: status;
  user: Users;
}