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

export const changeTagFormat = (category) => {
  switch (category) {
    case '300':
      return ['배달 🛵'];
    case '600':
      return ['OTT 📺'];
    case '100':
      return ['식품 🍎'];
    case '400':
      return ['의류 👕'];
    case '900':
      return ['장보기친구 🙋 '];
    case '200':
      return ['생활용품 🧹 '];
    case '500':
      return ['미용/화장품 💄 '];
    case '700':
      return ['온라인강의/Software 💻 '];
    case '800':
      return ['반려동물 🐾 '];

    default:
      return category;
  }
};
