import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { fonts } from '../constants/fonts';
import { grey } from '@material-ui/core/colors';

const hoverAnimTime = '0.2s'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0px 0px 10px 0px #00000088',
    transition: `box-shadow ${hoverAnimTime}`,
    overflow: 'hidden',
    '&:hover': {
      boxShadow: '0px 0px 15px 0px #000000ff',
      '& #icon': {
        filter: 'blur(2px)',
        opacity: 0.7
      },
      '& #label': {
        opacity: 0.8
      }
    }
  },
  img: {
    padding: '10%',
    width: '80%',
    height: '80%',
    objectFit: 'cover',
    transition: `filter ${hoverAnimTime}, opacity ${hoverAnimTime}`
  },
  textContainer: {
    top: 0,
    left: 0,
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: fonts.base,
    fontSize: '200%',
    color: grey[900],
    fontWeight: 600,
    opacity: 0,
    transition: `opacity ${hoverAnimTime}`
  }
}))

interface IImageButton {
  src?: string // https://www.w3schools.com/css/rock600x400.jpg
  label: string
  className?: string
  onClick: () => any
}

const ImageButton = (props: IImageButton) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, props.className)}
      onClick={props.onClick}
    >
      <img
        id='icon'
        src={props.src}
        className={classes.img}
      />
      <div
        id='label'
        className={classes.textContainer}
      >
        <div style={{ textAlign: 'center' }}>{props.label}</div>
      </div>
    </div>
  )
}

export default ImageButton