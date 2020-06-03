import { IExerciseSet } from '../interfaces'
import { EXCERCISE_SETS_REDUCER } from '../constants/REDUX/EXCERCISE_SETS_REDUCER'
import { IExcerciseSetsAction } from '../reducers/excerciseSets.reducer'

export const excersizeSetsActions = {
  set: (excerciseSets: IExerciseSet[]): IExcerciseSetsAction => ({
    type: EXCERCISE_SETS_REDUCER.SET,
    excerciseSets
  }),
  add: (excerciseSet: IExerciseSet): IExcerciseSetsAction => ({
    type: EXCERCISE_SETS_REDUCER.ADD,
    excerciseSet
  }),
  remove: (removeIndex: number): IExcerciseSetsAction => ({
    type: EXCERCISE_SETS_REDUCER.REMOVE,
    removeIndex
  }),
}