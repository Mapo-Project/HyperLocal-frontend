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
    case 'λ°°λ¬':
      return ['λ°°λ¬ π΅'];
    case 'OTT':
      return ['OTT πΊ'];
    case 'μν':
      if (isHomemade) {
        return ['μν π', 'νλ©μ΄λ π§‘'];
      }
      return ['μν π'];
    case 'μλ₯':
      return ['μλ₯ π'];
    case 'μ₯λ³΄κΈ°μΉκ΅¬':
      return ['μ₯λ³΄κΈ°μΉκ΅¬ π '];
    case 'μνμ©ν':
      return ['μνμ©ν π§Ή '];
    case 'λ―Έμ©/νμ₯ν':
      return ['λ―Έμ©/νμ₯ν π '];
    case 'μ¨λΌμΈκ°μ/Software':
      return ['μ¨λΌμΈκ°μ/Software π» '];
    case 'λ°λ €λλ¬Ό':
      return ['λ°λ €λλ¬Ό πΎ '];

    default:
      return tag;
  }
};
