import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private synth = window.speechSynthesis;

  speak(text: string): void {
    // console.log('inn', text);
    const utterance = new SpeechSynthesisUtterance(text);
    // console.log('utterance', utterance);
    this.synth.speak(utterance);
  }
}
