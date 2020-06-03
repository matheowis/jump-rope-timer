// import { store } from '../store';
// import { setRoute } from '../actions/route';
// import { firebase } from '../firebase/firebase';
// import { excerciseRequests } from '../services/excersice.service'
// import { setExcercises } from '../actions/excercise';

// export const checkAuth = () => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       excerciseRequests.getExcercises().then(ex => {
//         store.dispatch(setExcercises(ex));
//       })
//     } else {
//       store.dispatch(setRoute('login'))
//     }
//   })
// }
