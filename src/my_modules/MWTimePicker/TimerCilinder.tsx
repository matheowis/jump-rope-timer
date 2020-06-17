import * as React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  item: {
    position: 'absolute'
  }
}))


interface ITimerCilinder {
  spread: number
}

const TimerCilinder = (props: ITimerCilinder) => {
  const classes = useStyles();
  const divRefs = new Array(8).fill(0).map(_ => React.createRef<HTMLDivElement>());
  const SPREAD = 60;

  const spinLerp = (alpha: number, ref: React.RefObject<HTMLDivElement>) => {
    const lAlpha = alpha * 2;
    
  }

  React.useEffect(() => {
    divRefs.forEach(ref => {
      if (ref.current) {

      }

    });
  }, [])

  const spin = () => {

  }

  return (
    <div className={classes.root} >
      {divRefs.map(ref => (
        <div
          className={classes.item}
          ref={ref}
        />
      ))}
    </div>
  )
}

export default TimerCilinder