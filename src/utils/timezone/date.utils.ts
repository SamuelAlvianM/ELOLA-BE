import { formatInTimeZone } from 'date-fns-tz';

const JAKARTA_TIMEZONE = 'Asia/Jakarta';

export function convert_to_jakarta_time(utc_date: Date | number): string {
    return formatInTimeZone(utc_date, JAKARTA_TIMEZONE, 'yyyy-MM-dd HH:mm:ss zzz');
}
