import useSound from 'use-sound';
import React from 'react';
import {ContentManager} from "../Filesystem/Content.ts";

const AudioManager: React.FC = () => {
    const music = ContentManager.GetPath(ContentManager.Content.music, "gcbullyingscene.mp3");
    const [play] = useSound(music);

    return (
        <button onClick={play()}>¡Haz clic para sonar!</button>
    );

};

export default AudioManager;
