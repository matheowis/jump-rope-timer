import { Action } from 'redux';
import { IExerciseSet } from '../interfaces'
import { EXCERCISE_SETS_REDUCER } from '../constants/REDUX/EXCERCISE_SETS_REDUCER'

export interface IExcerciseSetsAction extends Action {
  excerciseSets?: IExerciseSet[],
  excerciseSet?: IExerciseSet,
  removeIndex?: number
}

const defaultExcerciseSets: IExerciseSet[] = [];

export const excerciseSets = (state = defaultExcerciseSets, action: IExcerciseSetsAction) => {
  switch (action.type) {
    case EXCERCISE_SETS_REDUCER.SET:
      if (action.excerciseSets === undefined)
        throw ('exercises reducer error, provided excercises is undefined')
      return action.excerciseSets;
    case EXCERCISE_SETS_REDUCER.ADD:
      if (action.excerciseSet === undefined)
        throw ('exercises reducer error, provided excercise is undefined')
      return [...state, action.excerciseSet]
    case EXCERCISE_SETS_REDUCER.REMOVE:
      if (action.removeIndex === undefined)
        throw ('exercises reducer error, provided removeIndex is undefined')
      return state.filter((_, i) => i !== action.removeIndex);
    default:
      return state;
  }
}