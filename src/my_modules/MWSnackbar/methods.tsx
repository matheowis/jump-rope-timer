import * as React from 'react';
import ReactDOM from 'react-dom';
import { red, amber, blue, green, grey } from '@material-ui/core/colors';
import { makeStyles, Typography } from '@material-ui/core'
import {
  Done as SuccessIcon,
  ErrorOutline as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import { SNAP_GAP, SNAP_HEIGHT } from './constants';
import { TSnackbarType } from './interfaces';

export const getTypeColor = (type?: TSnackbarType) => {
  switch (type) {
    case 'warning':
      return amber[700]
    case 'error':
      return red[700]
    case 'info':
      return blue[600]
    case 'success':
      return green[600]
    default:
      return grey[800]
  }
}

export const getHeightById = (index: number) => index * (SNAP_GAP + SNAP_HEIGHT);

interface ISnapBarIcon {
  type?: TSnackbarType
  className: string
}

const SnapBarIcon = (props: ISnapBarIcon) => {
  switch (props.type) {
    case 'warning':
      return <WarningIcon className={props.className} />
    case 'error':
      return <ErrorIcon className={props.className} />
    case 'info':
      return <InfoIcon className={props.className} />
    case 'success':
      return <SuccessIcon className={props.className} />
    default:
      return <></>
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: grey[100],
    padding: 12
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12
  },
  text: {
    fontSize: 20,
  }
}))

export const getSnapbarInnerHTML = (text: string, type?: TSnackbarType) => {
  const Comp = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <SnapBarIcon className={classes.icon} type={type} />
        <Typography className={classes.text}>{text}</Typography>
      </div>
    )
  }

  const el = document.createElement('div');

  return new Promise((resolve: (v: string) => any) => {
    ReactDOM.render(<Comp />, el, () => {
      resolve(el.innerHTML);
    });
  })
}