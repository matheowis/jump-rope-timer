import * as React from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import CountCircle from '../components/CountCircle';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    height: '50%',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  circle: {
    boxShadow: '0px 10px 30px 0px #00000088',
    width: '40vh',
    height: '40vh',
    borderRadius: '20vh',
  },
  circleOn: {
    backgroundColor: `${green[500]}aa`,
  },
  circleOff: {
    backgroundColor: `${grey[500]}aa`,
  },
  circleStarting: {
    backgroundColor: `${red[500]}aa`,
  }
}))

const MainPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CountCircle />
      {/* <div className={classes.flexRow}>
        <div className={classes.flexColumn}>
          <div className={classes.circle}>

          </div>
        </div>
      </div> */}
    </div>
  )
}

export default MainPage;