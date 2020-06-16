import * as React from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import CountCircle from '../components/CountCircle';
import ImageButton from '../components/ImageButton';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
  },
  imageButton: {
    width: '20vh',
    height: '20vh',
    borderRadius: '10vh',
    [theme.breakpoints.down('md')]: {
      width: '40vw',
      height: '40vw',
      borderRadius: '20vw',
    }
  },
  buttonsMargin: {
    width: '10vw',
    [theme.breakpoints.down('md')]: {
      width: '5vw',
    }
  },
  buttonDivider: {
    flex: 1
  }

}))

const MainPage = () => {
  const classes = useStyles();

  const Func = {
    start: (timeInMs: number) => { }
  }

  return (
    <div className={classes.root}>
      <CountCircle Func={Func} />
      <div style={{ display: 'flex' }}>
        <div className={classes.buttonsMargin} />
        <ImageButton
          className={classes.imageButton}
          src='./images/heavyRope.jpg'
          label='Heavy'
          onClick={() => { Func.start(90000); }}// 01:30
        />
        <div className={classes.buttonDivider} />
        <ImageButton
          className={classes.imageButton}
          src='./images/lightRope.jpg'
          label='Light'
          onClick={() => { Func.start(150000); }}// 02:30
        />
        <div className={classes.buttonsMargin} />
      </div>
    </div>
  )
}

export default MainPage;