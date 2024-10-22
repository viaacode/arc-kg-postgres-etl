export function logInfo(message: any, ...optionalParams: any[]) {
    logPrefect('INFO', message, optionalParams)
}

export function logError(message: any, ...optionalParams: any[]) {
    logPrefect('ERROR', message, optionalParams)
}

export function logDebug(message: any, ...optionalParams: any[]) {
    logPrefect('DEBUG', message, optionalParams)
}

export function logPrefect(level: "INFO" | "ERROR" | "DEBUG" | "WARNING", message: any, ...optionalParams: any[]) {
    console.log(JSON.stringify({ PREFECT: { level, message, optionalParams } }))
}

export function getErrorMessage(e: unknown): string | undefined{
    if (typeof e === "string") {
        return e.toUpperCase() // works, `e` narrowed to string
    } else if (e instanceof Error) {
        return e.message // works, `e` narrowed to Error
    }
    return
}

export function isValidDate(date: any) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
}

export function msToTime(s: number) {
  s = Math.round(s)
  // Pad to 2 or 3 digits, default is 2
  var pad = (n: number, z = 2) => ('00' + n).slice(-z);
  return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0) + '.' + pad(s%1000, 3);
}
