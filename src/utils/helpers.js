import router from "../router";

const redirect = url => router.push({ path: url });

const getSecondsAccumulated = secondsAccumulated => {
  let seconds = parseInt(secondsAccumulated % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return seconds;
};

const getMinutesAccumulated = secondsAccumulated => {
  let minutes = parseInt(secondsAccumulated / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes;
};

const getDay = dateTime => {
  return dateTime.getDate() < 10
    ? "0" + dateTime.getDate()
    : dateTime.getDate();
};

const getMonth = dateTime => {
  return dateTime.getMonth() < 10
    ? "0" + dateTime.getMonth()
    : dateTime.getMonth();
};

const getYear = dateTime => {
  return dateTime.getFullYear();
};

const getHour = dateTime => {
  return dateTime.getHours() < 10
    ? "0" + dateTime.getHours()
    : dateTime.getHours();
};

const getMinutes = dateTime => {
  return dateTime.getMinutes() < 10
    ? "0" + dateTime.getMinutes()
    : dateTime.getMinutes();
};

const getSeconds = dateTime => {
  return dateTime.getSeconds() < 10
    ? "0" + dateTime.getSeconds()
    : dateTime.getSeconds();
};

const setDate = updatedDate => {
  const date = new Date(updatedDate);
  const day = getDay(date);
  const month = getMonth(date);
  const year = getYear(date);
  return day + "/" + month + "/" + year;
};

const setTimer = secondsAccumulated => {
  const seconds = getSecondsAccumulated(secondsAccumulated);
  const minutes = getMinutesAccumulated(secondsAccumulated);
  return minutes + ":" + seconds;
};

export {
  redirect,
  getSecondsAccumulated,
  getMinutesAccumulated,
  getDay,
  getMonth,
  getYear,
  getHour,
  getMinutes,
  getSeconds,
  setDate,
  setTimer
};
