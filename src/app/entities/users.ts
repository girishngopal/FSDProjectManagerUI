import { Injectable } from '@angular/core';

export interface Users {
  userId: number;
  firstName,lastName,employeeId: string;
  projectId?: number;
}