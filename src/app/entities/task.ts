
export interface TaskModel {
    taskId,parentId?,projectId?,userId?: number;
    parentName?,projectName?,taskName?,userName?: string;
    startDate?,endDate? :Date;
    priority?:number;
    status:boolean;
  }