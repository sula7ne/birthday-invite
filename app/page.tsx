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

            if (document.hidden) {
                // ПЛАВНЫЙ ВЫХОД: Снижаем громкость и только потом на паузу
                gsap.to(audio, {
                    volume: 0,
                    duration: 0.8,
                    onComplete: () => {
                        audio.pause();
                    }
                });
            } else {
                // ПЛАВНЫЙ ВХОД: Убираем "баги" синхронизации
                // Проверяем, было ли аудио вообще запущено (currentTime > 0)
                if (audio.currentTime > 0) {
                    // Маленький хак для очистки буфера
                    audio.currentTime = audio.currentTime; 
                    
                    audio.play().then(() => {
                        gsap.to(audio, {
                            volume: 1, // Возвращаем к полной громкости
                            duration: 1,
                            ease: "power1.inOut"
                        });
                    }).catch(() => {
                        // Если автоплей заблокирован, просто ждем клика
                        console.log("Audio resume blocked by browser");
                    });
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