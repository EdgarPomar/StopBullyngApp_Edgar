export class ContentManager {
        static Content = {
                "backgrounds": "assets/img/backgrounds",
                "characters": "assets/img/characters",
                "sprites": "assets/img/sprites",
                "ui": "assets/img/ui",
                "music": "assets/audio/bgm",
                "sounds": "assets/sounds"
        }

        static GetPath(contentPath: string, filename: string): string {
                const programRoot = `${window.location.origin.replace(/\/$/, "")}/${contentPath}/${filename}`;
                return programRoot;
        }
}
