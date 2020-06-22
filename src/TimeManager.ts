interface IGetTime {
  miliseconds: string,
  seconds: string,
  minutes: string,
  time: number
}

function CheckLength(value: string, places: number): string {
  const zerosToAdd = places - value.length;
  const zeros = new Array(zerosToAdd).fill('0').join('');
  return zeros + value;
}

class TimeManager {
  private length = 0;
  private startDate = new Date().getTime();
  private requestId = 0;
  private type: 'forward' | 'reverse' = 'forward';
  private time = 0;

  private callback = (time: IGetTime) => { };

  private finish = (time: IGetTime) => { }

  private GetTime = (ms: number): IGetTime => {
    const sec = Math.floor(ms / 1000);
    const minutes = Math.floor(sec / 60);
    const seconds = sec - (minutes * 60);
    return {
      minutes: CheckLength(minutes.toFixed(), 2),
      seconds: CheckLength(seconds.toFixed(), 2),
      miliseconds: ms.toString().slice(-3),
      time: ms
    }
  }

  private _start = () => {
    const currentDate = new Date().getTime() + this.time;
    const miliseconds = currentDate - this.startDate;
    if (miliseconds >= this.length) {
      cancelAnimationFrame(this.requestId);
      this.finish(this.GetTime(this.length));
      return;
    }
    this.callback(this.GetTime(miliseconds));
    this.requestId = requestAnimationFrame(this._start);
  }

  private _startFromEnd = () => {
    const currentDate = new Date().getTime() + this.time;
    const miliseconds = this.length - (currentDate - this.startDate);
    console.log({miliseconds})
    if (miliseconds <= 0) {
      cancelAnimationFrame(this.requestId);
      this.finish(this.GetTime(0));
      return;
    }
    this.callback(this.GetTime(miliseconds));
    this.requestId = requestAnimationFrame(this._startFromEnd);
  }

  public start = (length: number, callback: (time: IGetTime) => any, finish: (time: IGetTime) => any) => {
    this.type = 'forward';
    this.time = 0;
    this.callback = callback;
    this.finish = finish;
    this.startDate = new Date().getTime();
    this.length = length;
    this._start();
  }

  public startFromEnd = (length: number, callback: (time: IGetTime) => any, finish: (time: IGetTime) => any) => {
    this.type = 'reverse';
    this.time = 0;
    this.callback = callback;
    this.finish = finish;
    this.startDate = new Date().getTime();
    this.length = length;
    this._startFromEnd();
  }

  public stop = () => {
    cancelAnimationFrame(this.requestId);
    const currentDate = new Date().getTime();
    const miliseconds = this.type === 'forward' ?
      currentDate - this.startDate :
      this.length - currentDate - this.startDate;

    this.time = miliseconds;
    const timeObj = this.GetTime(miliseconds)
    // this.finish(timeObj);
    return timeObj;
  }

  public continueTimer = () => {
    if (this.type = 'forward') {
      this._start();
    } else {
      this._startFromEnd();
    }
  }
}

export default TimeManager;

