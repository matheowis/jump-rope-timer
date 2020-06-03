import { ISetExcercise } from './ISetExcercise';

type TIExerciseSet = 

export interface IExerciseSet {
  excercises: ISetExcercise[]
  timeSpent: {
    type: 'exercise' | 'break',
    exercise: ISetExcercise | null,
    spent: number
  }[]
}