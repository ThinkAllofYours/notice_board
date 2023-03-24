import React from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const nineHoursInMilliseconds = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
  // Add 9 hours to the current time
  const newTime = new Date(now.setTime(now.getTime() + nineHoursInMilliseconds));

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = newTime - date;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months";
  } else {
    return Math.round(elapsed / msPerYear) + " years";
  }
}

const FormattedDate = ({ dateString }) => {
  const formattedDate = formatDate(dateString);
  return <>{formattedDate}</>;
};

export const toLocaleString = (dateString) => {
  const date = new Date(dateString);
  const nineHoursInMilliseconds = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
  // Add 9 hours to the current time
  const newTime = new Date(date.setTime(date.getTime() - nineHoursInMilliseconds));
  return newTime.toLocaleString();
};

export const toFormatSeoulTime = (date)=> {
  const seoulTimezoneOffset = 9 * 60 * 60 * 1000; // in milliseconds
  const seoulTime = new Date(date.getTime() + seoulTimezoneOffset);
  const formattedTime = seoulTime.toLocaleString('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return formattedTime;
}

export default FormattedDate;
