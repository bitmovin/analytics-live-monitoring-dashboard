export const seconds = 1000;
export const minutes = 60 * seconds;

export default (date, modifier) => new Date(date.getTime() + modifier);
