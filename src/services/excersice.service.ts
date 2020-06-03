// import { firebase } from '../firebase/firebase';
// import { IExercises, IExercise, IExerciseRaw, IExercisesRaw } from '../interfaces';

// export const excerciseRequests = {
//   getExcercises,
//   addExcercise,
//   updateExcercise,
//   deleteExcercise
// }

// function getExcercises() {
//   return new Promise((resolve: (value: IExercises) => any, reject) => {
//     const user = firebase.auth().currentUser
//     if (user) {
//       const excersicesData = {} as IExercises;
//       firebase.firestore().collection(`users/${user.uid}/excercises`).get().then(excersices => {
//         excersices.forEach(excercise => {
//           excersicesData[excercise.id] = { ...(excercise.data() as IExercise), key: excercise.id };
//         })
//         resolve(excersicesData);
//       }).catch(err => {
//         reject(err);
//       })
//     } else {
//       reject('authentication error');
//     }
//   })
// }

// function addExcercise(exer: IExerciseRaw) {
//   return new Promise((resolve: (id: string) => any, reject) => {
//     const user = firebase.auth().currentUser
//     if (user) {
//       firebase.firestore().collection(`users/${user.uid}/excercises`).add(exer).then(outEx => {
//         resolve(outEx.id);
//       }).catch(err => {
//         reject(err);
//       })
//     } else {
//       reject('authentication error');
//     }
//   })
// }

// function updateExcercise(exer: IExerciseRaw, id: string) {
//   return new Promise((resolve, reject) => {
//     const user = firebase.auth().currentUser
//     if (user) {
//       firebase.firestore().doc(`users/${user.uid}/excercises/${id}`).update(exer).then(res => {
//         resolve();
//       }).catch(err => {
//         console.log('updateExcercise Error', err);
//         reject(err);
//       })
//     } else {
//       reject('authentication error');
//     }
//   });
// }

// function deleteExcercise(id: string) {
//   return new Promise((resolve, reject) => {
//     const user = firebase.auth().currentUser
//     if (user) {
//       firebase.firestore().doc(`users/${user.uid}/excercises/${id}`).delete().then(res => {
//         resolve();
//       }).catch(err => {
//         console.log('deleteExcercise Error', err);
//         reject(err);
//       })
//     } else {
//       reject('authentication error');
//     }
//   });
// }