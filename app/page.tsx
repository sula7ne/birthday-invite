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
	}, []);

useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Вместо pause() мы просто выключаем звук. 
                // Это сохраняет поток данных живым, и он не "лагает" при возврате.
                audio.muted = true;
            } else {
                // Возвращаем звук мгновенно без переинициализации буфера
                audio.muted = false;

                // На всякий случай проверяем, не поставила ли система его на паузу
                if (audio.paused && audio.currentTime > 0) {
                    audio.play().catch(() => {});
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (audio) {
                audio.pause();
                audio.src = "";
            }
        };
    }, []);

	return (
		<div>
			{isLoading && <Loader />}

			{!isLoading && isIntro && <Intro audioRef={audioRef} />}
			
			{/* !isIntro */}
			{!isLoading && <Main audioRef={audioRef} />}

			<audio ref={audioRef} src={audioPath} preload="auto" loop />
		</div>
	);
}

export default Home;