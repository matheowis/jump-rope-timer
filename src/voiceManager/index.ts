let voices = speechSynthesis.getVoices();
let pickedVoice: SpeechSynthesisVoice | undefined = undefined;
setTimeout(() => {
  voices = speechSynthesis.getVoices();
  const googleVoice = voices.find(voice => voice.name === 'Google UK English Female');
  const anyOtherEanglishVoice = voices.find(voice => voice.lang === 'en-GB' || voice.lang === 'en-US');
  pickedVoice = googleVoice || anyOtherEanglishVoice;
  console.log('pickedVoice', pickedVoice);
}, 50);

export class VoiceManager {
  private timerId: any = -1;
  private start: number = 0;
  private every: number = 0;
  private duration: number = 0;
  private callback: (elapsed: number) => any = () => { console.log('ERROR CALLBACK') };
  private onFinish: () => any = () => { console.log('ERROR onFinish') };

  public volume: number = 1;
  public speakTime(every: number, callback: (elapsed: number) => any) {
    this.start = new Date().getTime();
    this.callback = callback;
    this.every = every;
    this.stop();
    this._speakTime();
  }
  // add count down simple - 10,9,8,7,6,5... start
  public countDown(every: number, duration: number, onFinish: () => any) {
    this.start = new Date().getTime();
    this.every = every;
    this.duration = duration;
    this.onFinish = onFinish;
    this.stop();
    this._countDown();
  }
  public speakText(text: string) {
    if (!pickedVoice) return;
    console.log('SPEAK')
    const actor = new SpeechSynthesisUtterance(text);
    actor.voice = pickedVoice;
    actor.volume = this.volume;

    speechSynthesis.speak(actor);
  }
  public stop() {
    clearTimeout(this.timerId);
  }
  private _speakTime() {
    this.timerId = setTimeout(() => {
      const time = new Date().getTime() - this.start;
      this.speakText(this._timeToText(time));
      this.callback(time);
      this._speakTime();
    }, this.every);
  }
  private _countDown() {
    this.timerId = setTimeout(() => {
      const time = this.duration - (new Date().getTime() - this.start) ;
      console.log({ time: (new Date().getTime() - this.start), duration: this.duration })
      this.speakText(this._timeToText(time));
      if (time < this.every) {
        this.stop();
        setTimeout(() => {
          speechSynthesis.cancel()
          this.speakText('Finished');
          this.onFinish();
        }, time);
      } else {
        this._countDown();
      }
    }, this.every);
  }
  private _timeToText(time: number): string {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.round((time - (60000 * minutes)) / 1000);
    if (minutes === 0) {
      return `${seconds} seconds`;
    } else if (minutes === 1) {
      return `${minutes} minute and ${seconds} seconds`;
    } else {
      return `${minutes} minutes and ${seconds} seconds`;
    }
  }
}

export const VoiceManagerInstance = new VoiceManager();
