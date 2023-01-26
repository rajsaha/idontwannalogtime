export class WorkLogUnit {
    duration: string
    durationInMinutes: number
    description: string
    logType: string
    createdAt: string

    constructor(
        duration: string,
        durationInMinutes: number,
        description: string,
        logType: string,
        createdAt: string
    ) {
        this.duration = duration
        this.durationInMinutes = durationInMinutes
        this.description = description
        this.logType = logType
        this.createdAt = createdAt
    }
}
