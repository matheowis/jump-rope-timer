import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import { fonts } from '../constants/fonts';
import TimeManager from '../TimeManager';

const useStyles = makeStyles(theme => ({
  flexRow: {
    position: 'relative',
    height: '70%',
    width: '100%'
  },
  circle: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0px 10px 30px 0px #00000088',
    left: 'calc(50% - 30vh)',
    top: 'calc(50% - 30vh)',
    width: '60vh',
    height: '60vh',
    borderRadius: '30vh',
    [theme.breakpoints.down('md')]: {
      left: 'calc(50% - 40vw)',
      top: 48,
      width: '80vw',
      height: '80vw',
      borderRadius: '40vw',
    }
  },
  circleOn: {
    backgroundColor: `${green[500]}aa`,
  },
  circleOff: {
    backgroundColor: `${grey[500]}aa`,
  },
  circleStarting: {
    backgroundColor: `${red[500]}aa`,
  },
  verticalCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: fonts.base,
    fontSize: '16vh',
    color: grey[100],
    [theme.breakpoints.down('md')]: {
      fontSize: '20vw',
    },
  },
  milisec: {
    position: 'absolute',
    right: '-3vh',
    bottom: '-2vh',
    fontSize: '5vh',
    [theme.breakpoints.down('md')]: {
      right: '-3vw',
      bottom: '-2vw',
      fontSize: '5vw'
    },
  }
}))

interface ICountCircle {
  Func: {
    start: (timeInMs: number) => any
  }
}

const CountCircle = (props: ICountCircle) => {
  const classes = useStyles();
  const timeRef = React.createRef<HTMLDivElement>();
  const milisecRef = React.createRef<HTMLDivElement>();
  const timeManager = new TimeManager();

  const setTime = (minutes: string, seconds: string, miliseconds: string) => {
    if (timeRef.current)
      timeRef.current.innerHTML = `${minutes}:${seconds}`;
    if (milisecRef.current)
      milisecRef.current.innerHTML = miliseconds;
  }

  props.Func.start = (timeInMs: number) => {
    timeManager.start(
      timeInMs,
      // callback every frame
      ({ minutes, seconds, miliseconds }) => {
        setTime(minutes, seconds, miliseconds);
      },
      // callback on finish
      ({ minutes, seconds, miliseconds }) => {
        setTime(minutes, seconds, miliseconds);
      })
  }

  return (
    <div className={classes.flexRow}>
      <div className={clsx(classes.circle, classes.circleOn)}>
        <div className={classes.verticalCenter}>
          <div style={{ position: 'relative' }}>
            <div ref={timeRef}>00:00</div>
            <div ref={milisecRef} className={classes.milisec}>000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountCircle