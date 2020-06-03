import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import { fonts } from '../constants/fonts';

const useStyles = makeStyles(theme => ({
  flexRow: {
    // display: 'flex',
    // justifyContent: 'center',
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
    fontSize: '12vh',
    color: grey[100],
  }
}))

const CountCircle = () => {
  const classes = useStyles();
  return (
    <div className={classes.flexRow}>
      <div className={clsx(classes.circle, classes.circleOn)}>
        <div className={classes.verticalCenter}>
          00:00:00
        </div>
      </div>
    </div>
  )
}

export default CountCircle