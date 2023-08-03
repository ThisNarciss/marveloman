import { Creator } from '../types/types';

const writer = (arr: any[]) =>
  arr.find((item: Creator) => item.role === 'writer') as Creator;

export default writer;
