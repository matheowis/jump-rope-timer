import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { ISnackbarObject, ISnackbarProps } from './interfaces';
import { getTypeColor, getHeightById, getSnapbarInnerHTML } from './methods';
import { ANIM_TIME, SNAP_HEIGHT } from './constants';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    bottom: 60,
    left: 12,
    zIndex: 10000,
  },
  snackbar: {
    position: 'absolute',
    display: 'flex',
    transition: `left ${ANIM_TIME.toFixed(1)}s, bottom ${ANIM_TIME.toFixed(1)}s`,
    bottom: 0,
    left: '-100vw',
    width: '80vw',
    height: SNAP_HEIGHT,
    backgroundColor: '#f00',
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

export const SnackbarController = {
  addSnackbar: (props: ISnackbarProps) => { }
};

interface ISnackbarManager {
  autoHideDuration: number
  max: number
}

const SnackbarManager = (props: ISnackbarManager) => {
  const classes = useStyles();
  const sanckbarsHolder: ISnackbarObject[] = new Array(props.max).fill(0).map(s => ({
    ref: React.createRef<HTMLDivElement>(),
    createdAt: 0,
    type: undefined,
    text: '',
    timeoutId: 0 as unknown as NodeJS.Timeout
  }));

  const queueHolder: ISnackbarProps[] = [];
  let queueCleared = true;
  let queueStart = 0;

  const recursiveQueue = () => {
    if (queueCleared) {
      if (queueHolder.length !== 0) {
        handleAddSnackbar(queueHolder[0]);
        queueHolder.splice(0, 1);
        queueCleared = false;
        queueStart = new Date().getTime() + (ANIM_TIME * 2000) + 200;
        setTimeout(() => {
          queueCleared = true;
        }, ANIM_TIME * 2000);
      }
    } else {
      setTimeout(() => {
        recursiveQueue();
      }, queueStart - new Date().getTime());
    }
  }

  const handleAddToQueue = (snackbarProps: ISnackbarProps) => {
    queueHolder.push(snackbarProps);
    recursiveQueue();
  }

  const handleAddSnackbar = (snackbarProps: ISnackbarProps) => {
    /// kolejkowanie
    const newSnackbar = sanckbarsHolder.find(s => s.createdAt === 0);
    if (!newSnackbar) throw ('MWSnackbar - No snackbar with createdAt === 0 (1)');

    newSnackbar.timeoutId = setTimeout(() => {
      if (!newSnackbar.ref.current) throw (`MWSnackbar - No newSnackbar ref in handleAddSnackbar (2)`)
      newSnackbar.ref.current.style.left = '-650px';
      clearTimeout(newSnackbar.timeoutId);
      newSnackbar.text = '';
      newSnackbar.createdAt = 0;
      newSnackbar.type = undefined;
      newSnackbar.timeoutId = -1 as unknown as NodeJS.Timeout
      setTimeout(() => {
        (newSnackbar.ref.current as HTMLDivElement).style.bottom = '0px';
      }, ANIM_TIME * 1000);
    }, props.autoHideDuration);

    const workingSnackBars = sanckbarsHolder.filter(s => s.createdAt !== 0);
    console.log({ workingSnackBars })
    workingSnackBars.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);

    const setNewSnackbar = () => {
      if (!newSnackbar.ref.current) throw (`MWSnackbar - No newSnackbar ref in handleAddSnackbar (3)`);
      newSnackbar.createdAt = new Date().getTime();
      newSnackbar.type = snackbarProps.type;
      newSnackbar.text = snackbarProps.text;
      getSnapbarInnerHTML(newSnackbar.text, newSnackbar.type).then(innerHTML => {
        (newSnackbar.ref.current as HTMLDivElement).innerHTML = innerHTML;
      })
      newSnackbar.ref.current.style.left = '0px';
      newSnackbar.ref.current.style.backgroundColor = getTypeColor(newSnackbar.type);
    }

    if (workingSnackBars.length === sanckbarsHolder.length - 1) {
      console.log('NEW_A')
      if (workingSnackBars.some(s => !s.ref.current)) (`MWSnackbar - No workingSnackBars refs in handleAddSnackbar (4)`);
      (workingSnackBars[workingSnackBars.length - 1].ref.current as HTMLDivElement).style.left = '-700px';
      workingSnackBars[workingSnackBars.length - 1].createdAt = 0;
      clearTimeout(workingSnackBars[workingSnackBars.length - 1].timeoutId);
      workingSnackBars[workingSnackBars.length - 1].timeoutId = -1 as unknown as NodeJS.Timeout
      setTimeout(() => {
        (workingSnackBars[workingSnackBars.length - 1].ref.current as HTMLDivElement).style.bottom = '0px';
        workingSnackBars.forEach((snackbarObject, i) => {
          if (i === workingSnackBars.length - 1) return;
          (snackbarObject.ref.current as HTMLDivElement).style.bottom = `${getHeightById(i + 1)}px`;
        });
      }, ANIM_TIME * 1000);
      setTimeout(() => {
        setNewSnackbar();
      }, ANIM_TIME * 2000);
    } else {
      console.log('NEW_B')
      workingSnackBars.forEach((snackbarObject, i) => {
        if (!snackbarObject.ref.current) throw (`MWSnackbar - No snackbarObject[${i}] ref in handleAddSnackbar (5)`)
        snackbarObject.ref.current.style.bottom = `${getHeightById(i + 1)}px`
      })
      setTimeout(() => {
        setNewSnackbar();
      }, ANIM_TIME * 1000);
    }
  }

  SnackbarController.addSnackbar = handleAddToQueue;

  return (
    <div className={classes.container} >
      {sanckbarsHolder.map((snackbarObject, i) => (
        <div
          key={`snackbarObject-${i}`}
          className={classes.snackbar}
          ref={snackbarObject.ref}
        />
      ))}
    </div>
  )
}

export default SnackbarManager