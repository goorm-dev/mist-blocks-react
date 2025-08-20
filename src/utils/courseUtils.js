import dayjs from './dayjs';

export const getRecruitmentStatus = (startAt, endAt) => {
  const now = dayjs();
  const start = dayjs(startAt);
  const end = dayjs(endAt);

  if (now.isBefore(start)) {
    return { status: "모집 예정", statusType: "contrast" };
  } else if (now.isBetween(start, end, null, '[]')) {
    return { status: "모집 중", statusType: "open" };
  } else {
    return { status: "모집 마감", statusType: "close" };
  }
};

export const formatPeriod = (startAt, endAt) => {
  const start = dayjs(startAt);
  const end = dayjs(endAt);

  return `${start.format('YY.MM.DD (ddd)')} - ${end.format('YY.MM.DD (ddd)')}`;
};