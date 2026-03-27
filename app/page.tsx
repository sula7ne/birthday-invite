"use client"

import { useEffect, useRef, useState } from "react";

import Intro from "@/components/Intro/Intro";
import Loader from "@/components/Loader/Loader";
import Main from "@/components/Main/Main";
import { useAppSelector } from "@/state/hooks";

const Home = () => {
    const { isIntro } = useAppSelector(state => state.app);

    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioPath = "/audio/rickroll.mp3";

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                audioRef.current?.pause();
            } else { 
				audioRef.current?.play();
			}
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        const preloadImages = () => {
            const images = Array.from(document.images);
            return Promise.all(
                images.map((img) => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );
        };

        const init = async () => {
            await preloadImages();
            await new Promise((res) => setTimeout(res, 300));
            setIsLoading(false);
        };

        init();

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current.load();
            }
        };
    }, []);

    return (
        <div>
            {isLoading && <Loader />}

            {!isLoading && isIntro && <Intro audioRef={audioRef} />}
            
            {!isLoading && <Main audioRef={audioRef} />}

            <audio ref={audioRef} src={audioPath} preload="auto" loop />
        </div>
    );
}

export default Home;