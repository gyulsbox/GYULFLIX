import {atom} from 'recoil';

export const clickedMovieIdState = atom<string>({
  key: 'id',
  default: '',
});
