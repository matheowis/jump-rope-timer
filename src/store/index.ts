import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { excerciseSets } from '../reducers/excerciseSets.reducer';
import { IExerciseSet } from '../interfaces';

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  next(action);
  console.log("State after:", store.getState());
};

const createStoreWithMiddleware = compose(
  applyMiddleware(loggerMiddleware)
)(createStore);

export interface IStore {
  excerciseSets: IExerciseSet[]
}

export const store = createStoreWithMiddleware(
  combineReducers({
    excerciseSets
  }),
  {}
);
