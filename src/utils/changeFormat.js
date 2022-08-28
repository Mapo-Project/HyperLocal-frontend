import { getMonth, getDate } from 'date-fns';

export const changeDate = (originDate) => {
  if (typeof originDate !== 'string') {
    return `${
      getMonth(originDate) > 8
        ? `${getMonth(originDate) + 1}`
        : `0${getMonth(originDate) + 1}`
    }.${
      getDate(originDate) > 9
        ? `${getDate(originDate)}`
        : `0${getDate(originDate)}`
    }`;
  }
  return originDate;
};

export const changeTagFormat = (tag, isHomemade) => {
  switch (tag[0]) {
    case '배달':
      return ['배달 🛵'];
    case 'OTT':
      return ['OTT 📺'];
    case '식품':
      if (isHomemade) {
        return ['식품 🍎', '홈메이드 🧡'];
      }
      return ['식품 🍎'];
    case '의류':
      return ['의류 👕'];
    case '장보기친구':
      return ['장보기친구 🙋 '];
    case '생활용품':
      return ['생활용품 🧹 '];
    case '미용/화장품':
      return ['미용/화장품 💄 '];
    case '온라인강의/Software':
      return ['온라인강의/Software 💻 '];
    case '반려동물':
      return ['반려동물 🐾 '];

    default:
      return tag;
  }
};
