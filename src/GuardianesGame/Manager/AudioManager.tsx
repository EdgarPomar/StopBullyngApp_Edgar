export class AudioPlayer {
    private audio: HTMLAudioElement;
    private isPlaying: boolean;

    constructor(src: string, loop: boolean = false, volume: number = 1.0) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
        this.isPlaying = false;
    }

    play(): void {
        this.audio.play();
        this.isPlaying = true;
    }

    pause(): void {
        this.audio.pause();
        this.isPlaying = false;
    }

    stop(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
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
        return this.isPlaying;
    }
}
