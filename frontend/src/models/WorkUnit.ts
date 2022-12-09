export class WorkUnit {
    private duration: string
    private description: string
    private logType: string
    private createdAt: string

    constructor(
        duration: string,
        description: string,
        logType: string,
        createdAt: string
    ) {
        this.duration = duration
        this.description = description
        this.logType = logType
        this.createdAt = createdAt
    }
}
