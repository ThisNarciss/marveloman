import { Creator } from '../types/types';

const writer = (arr: any[]) =>
  arr.find((item: Creator) => item.role === 'writer') as Creator;

export const price = (arr: any[]) =>
  arr.find(item => item.type === 'printPrice')?.price as number;

export const date = (arr: any[]) =>
  arr.find(item => item.type === 'onsaleDate')?.date as string;

export default writer;
