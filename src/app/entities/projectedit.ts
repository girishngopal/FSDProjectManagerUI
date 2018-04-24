import { Injectable } from '@angular/core';
import { status } from './status';
import { Users } from './users';
import { Project } from './project';

export interface ProjectEdit {
  status: status;
  project: Project;
}