import * as React from 'react';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  baseDigit: {
    width: 50,
    height: 30,
    lineHeight: '30px',
  }
}))

// 2 rotating cillinders for minutes and seconds
// dynamic top and opacity styles

const TimePicker = () => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit}>00</div>
        <div className={classes.baseDigit}>01</div>
        <div className={classes.baseDigit}>02</div>
        <div className={classes.baseDigit}>03</div>
      </div>
      <div>
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit} />
        <div className={classes.baseDigit}>00</div>
        <div className={classes.baseDigit}>05</div>
        <div className={classes.baseDigit}>10</div>
        <div className={classes.baseDigit}>15</div>
      </div>
    </div>
  )
}