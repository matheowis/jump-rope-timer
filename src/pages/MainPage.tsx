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
    borderRadius: '10vh'
  }

}))

const MainPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CountCircle />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '10vw' }} />
        <ImageButton
          className={classes.imageButton}
          src='./images/heavyRope.jpg'
          label='Heavy'
          onClick={() => { }}
        />
        {/* <div style={{ width: '20vh', height: '20vh', backgroundColor: green[500], borderRadius: '10vh' }}>Heavy</div> */}
        <div style={{ flex: 1 }} />
        <ImageButton
          className={classes.imageButton}
          src='./images/lightRope.jpg'
          label='Light'
          onClick={() => { }}
        />
        {/* <div style={{ width: '20vh', height: '20vh', backgroundColor: green[500], borderRadius: '10vh' }}>Light</div> */}
        <div style={{ width: '10vw' }} />
      </div>
    </div>
  )
}

export default MainPage;