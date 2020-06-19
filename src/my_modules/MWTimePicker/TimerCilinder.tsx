import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { Vector2D, clamp } from '../../calc';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    cursor: 'pointer'
  },
  item: {
    position: 'absolute',
    userSelect: 'none',
    msUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  }
}))

interface ITimerCilinder {
  spread: number
  maxValue: number
}

const TimerCilinder = (props: ITimerCilinder) => {
  const classes = useStyles();
  const divRefs = new Array(8).fill(0).map(_ => React.createRef<HTMLDivElement>());
  const positions = new Array(8).fill(0).map((_, i) => new Vector2D(props.spread / 2, 0, i).rotate(-(Math.PI / 4 * i) + (Math.PI / 4 * 2)));
  const value = React.useRef(0);
  const clickHeight = React.useRef(0);
  const active = React.useRef(false);

  const getItemValue = (segment: number): string => {
    const localSeg = Math.abs(segment % 8);
    switch (localSeg) {
      case 0: return `${value.current}`;
      case 1: return value.current + 1 > props.maxValue ? '' : `${value.current + 1}`;
      case 2: return value.current + 2 > props.maxValue ? '' : `${value.current + 2}`;
      case 6: return value.current - 2 < 0 ? '' : `${value.current - 2}`;
      case 7: return value.current - 1 < 0 ? '' : `${value.current - 1}`;
      default: return '';
    }
  }

  const setCPosition = (rad: number) => {
    // TODO need to add value snaping
    // value.current = positions[0].rotatePrediction(rad, 8).segment;
    value.current = Math.floor(rad / (2 * Math.PI) * 8);
    divRefs.forEach((ref, i) => {
      const pos = positions[i];
      const predPos = pos.rotatePrediction(rad, 8);
      if (ref.current) {
        const opacity = clamp((predPos.y + 20) / props.spread, 0, 1);
        ref.current.style.opacity = `${opacity}`;
        ref.current.style.top = `${predPos.x + (props.spread / 2)}px`;
        ref.current.style.zIndex = `${Math.floor(predPos.y + props.spread / 2)}`;
        ref.current.innerHTML = getItemValue(predPos.segment)
        console.log({
          ref: ref.current,
          opacity,
          predPos,
          pos,
          zIndex: ref.current.style.zIndex,
          val: predPos.segment % 8
        })
      }
    })
  }

  React.useEffect(() => {
    setCPosition(Math.PI * 0.25);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clickHeight.current = event.clientY;
    active.current = true;
  }

  const handleMouseUp = (event: MouseEvent) => {
    clickHeight.current = event.clientY;
    active.current = false;
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (active.current) {
      // if (event.clientY - clickHeight.current > 0 && value.current >= 60) return;
      // if (event.clientY - clickHeight.current < 0 && value.current <= 0) return;
      setCPosition((event.clientY - clickHeight.current) / 10);
    }
  }

  return (
    <div
      className={classes.root}
      style={{ width: 20, height: props.spread }}
      onMouseDown={handleMouseDown}
    >
      {divRefs.map((ref, i) => (
        <div
          key={`TimerCillinderItem-${i}`}
          className={classes.item}
          ref={ref}
        >
          {i}
        </div>
      ))}
    </div>
  )
}

export default TimerCilinder