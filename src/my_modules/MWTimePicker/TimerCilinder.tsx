import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { Vector2D, clamp } from '../../calc';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
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
  // const positions = new Array(8).fill(0).map((_, i) => new Vector2D(props.spread / 2, 0, i).rotate(0));

  const getItemValue = (segment: number): string => {
    const localSeg = segment % 8;
    // console.log({ localSeg }, value.current)
    switch (localSeg) {
      case 0: return `${value.current}`
      case 1: return value.current + 1 > props.maxValue ? '' : `${value.current + 1}`
      case 2: return value.current + 2 > props.maxValue ? '' : `${value.current + 2}`
      case 6: return value.current - 2 < 0 ? '' : `${value.current - 2}`
      case 7: return value.current - 1 < 0 ? '' : `${value.current - 1}`
      default: return ''
    }
  }

  const setCPosition = (rad: number) => {
    value.current = positions[0].rotatePrediction(rad, 8).segment;
    // console.log('value', value.current)
    divRefs.forEach((ref, i) => {
      const pos = positions[i];
      const predPos = pos.rotatePrediction(rad, 8);
      const visibleSegments = [6, 7, 0, 1, 2];
      const sideSegments = [6, 2];
      // console.log(predPos)
      if (ref.current) {
        const seg = predPos.segment % 8;
        const opacity = clamp((predPos.y + 20) / props.spread, 0, 1);
        ref.current.style.opacity = `${opacity}`;
        ref.current.style.top = `${predPos.x + (props.spread / 2)}px`;
        // console.log(ref.current.style.top, seg)
        ref.current.style.zIndex = `${Math.floor(predPos.y + props.spread / 2)}`;
        if (visibleSegments.includes(seg)) {
          // console.log({
          //   ref: ref.current,
          //   val: getItemValue(predPos.segment),
          //   predPos,
          //   index: ref.current.style.zIndex,
          //   zi:pos.y + props.spread / 2,
          //   opacity:ref.current.style.opacity,
          //   opa:clamp((pos.y + 20) / props.spread, 0, 1)
          // });
          ref.current.innerHTML = getItemValue(predPos.segment)
          // ref.current.innerHTML = '5';
        }
      }
    })
  }

  React.useEffect(() => {
    setCPosition(Math.PI * 3);
  }, [])


  return (
    <div className={classes.root} style={{ width: 20, height: props.spread }}>
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