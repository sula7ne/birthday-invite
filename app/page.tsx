"use client"

import { useEffect, useRef, useState } from "react";

import Intro from "@/components/Intro/Intro";
import Loader from "@/components/Loader/Loader";
import Main from "@/components/Main/Main";
import gsap from "gsap"; // Используем GSAP для плавности громкости
import { useAppSelector } from "@/state/hooks";

const Home = () => {
    const { isIntro } = useAppSelector(state => state.app);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioPath = "/audio/rickroll.mp3";

    useEffect(() => {
        const audio = audioRef.current;

        const handleVisibilityChange = () => {
			if (!audio) return;

			// Убиваем все текущие анимации громкости, чтобы они не конфликтовали
			gsap.killTweensOf(audio);

			if (document.hidden) {
				// Плавное затухание перед паузой
				gsap.to(audio, {
					volume: 0,
					duration: 0.5,
					onComplete: () => {
						audio.pause();
					}
				});
			} else {
				// Проверяем, начат ли уже трек (чтобы не включать музыку до старта интро)
				// Если аудио было на паузе и время больше 0
				if (audio.currentTime > 0) {
					
					// 1. ПРИНУДИТЕЛЬНЫЙ СБРОС:
					// Это лечит "ускорение", так как заставляет браузер пересоздать буфер
					const savedTime = audio.currentTime;
					audio.pause(); 
					audio.currentTime = savedTime; 

					// 2. ЗАПУСК ПОСЛЕ МИКРО-ПАУЗЫ:
					// Даем браузеру 50мс, чтобы "продышаться"
					setTimeout(() => {
						audio.play().then(() => {
							gsap.fromTo(audio, 
								{ volume: 0 }, 
								{ volume: 1, duration: 1.2, ease: "power2.inOut" }
							);
						}).catch(err => console.log("Playback failed:", err));
					}, 50);
				}
			}
		};

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // --- Твой код инициализации ---
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
            if (audio) {
                gsap.killTweensOf(audio); // Очищаем анимации громкости
                audio.pause();
                audio.src = "";
            }
        };
    }, []);

    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && isIntro && <Intro audioRef={audioRef} />}
            {!isLoading && <Main audioRef={audioRef} />}
			
            <audio 
                ref={audioRef} 
                src={audioPath} 
                preload="auto" 
                loop 
                // Важно: начальная громкость 1, но GSAP будет ей управлять
            />
        </div>
    );
}

export default Home;