export interface ScheduleInfo {
    dayName: string,
    schedule: Array<subjectInfo>
}


interface subjectInfo {
    time: string,
    subject: string
}