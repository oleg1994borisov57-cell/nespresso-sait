import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

export const isAteOClock = (date) => {
  const currHour = dayjs(date).tz("Europe/Moscow").hour();

  if (currHour >= 18) {
    return true;
  } else {
    return false;
  }
};
