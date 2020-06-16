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
    const currentDate = new Date().getTime();
    const miliseconds = currentDate - this.startDate;
    console.log('MILISCEONS', miliseconds >= this.length)
    if (miliseconds >= this.length) {
      cancelAnimationFrame(this.requestId);
      this.finish(this.GetTime(this.length));
      return;
    }
    this.callback(this.GetTime(miliseconds));
    this.requestId = requestAnimationFrame(this._start);
  }

  public start = (length: number, callback: (time: IGetTime) => any, finish: (time: IGetTime) => any) => {
    this.callback = callback;
    this.finish = finish;
    this.startDate = new Date().getTime();
    this.length = length;
    this._start();
  }
}

export default TimeManager;