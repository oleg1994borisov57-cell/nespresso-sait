import dayjs from "dayjs";
import { isAteOClock } from "./isAteOClock";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function isSameDayAndAfter6PM(targetDate, matchDate) {
  if (isAteOClock(targetDate) && dayjs(matchDate).isSame(targetDate, "day")) {
    return true;
  } else {
    return false;
  }
}
