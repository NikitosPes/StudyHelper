export interface ScheduleRowResponseModel {
    Id: number,
    Time: string,
    SubjectName: string
}

export interface ScheduleResponseModel {
    monday: ScheduleRowResponseModel [], 
    tuesday: ScheduleRowResponseModel [], 
    wednsday: ScheduleRowResponseModel [], 
    thursday: ScheduleRowResponseModel [], 
    friday: ScheduleRowResponseModel [], 
    saturday: ScheduleRowResponseModel []
}

