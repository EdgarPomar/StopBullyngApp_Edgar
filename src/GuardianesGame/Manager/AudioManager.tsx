export class AudioPlayer {
    private audio: HTMLAudioElement;

    constructor(src: string, loop: boolean = false, volume: number = 1.0) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
    }

    isPlaying() : boolean {
        return !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
    }


    play(): void {
        if(this.isPlaying()) {
            this.stop();
        }
        this.audio.play();
    }

    pause(): void {
        this.audio.pause();
    }

    stop(): void {
        this.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume: number): void {
        if (volume < 0 || volume > 1) {
            throw new Error('Volume must be between 0.0 and 1.0');
        }
        this.audio.volume = volume;
    }

    setLoop(loop: boolean): void {
        this.audio.loop = loop;
    }

    get isPlayingStatus(): boolean {
        return this.isPlaying();
    }
}
