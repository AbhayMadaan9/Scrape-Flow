import { intervalToDuration } from "date-fns";

export function datesToDurationString(start?: Date | null, end?: Date | null) {
    if (!start || !end) return null;
    const timeElapsed = start.getTime() - end.getTime();

    if(timeElapsed < 1000){
        return `${timeElapsed}ms`
    } 
    const duration = intervalToDuration({
        start: 0,
        end: timeElapsed
    })
 return `${duration.minutes || 0}m ${duration.seconds || 0}s`
}


