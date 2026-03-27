"use client";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useRef } from "react";

import confetti from "canvas-confetti";
import { setIsBeated } from "@/state/slices/appSlice";
import styles from "@/components/Animations/Confetti/Confetti.module.scss";

interface ConfettiProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const Confetti = ({ audioRef }: ConfettiProps) => {
    const { isIntroOpening } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let animationId: number;
        let myConfetti: confetti.CreateTypes | null = null;
        let audioCtx: AudioContext | null = null;
        let analyser: AnalyserNode | null = null;
        let source: MediaElementAudioSourceNode | null = null;
        let hasFired = false; 

        if (isIntroOpening && canvasRef.current && audioRef.current) {
            myConfetti = confetti.create(canvasRef.current, { resize: true, useWorker: true });
            const colors = ["#fce18a", "#ff726d", "#b48def", "#f4306d", "#42a5f5", "#66bb6a", "#ffa726"];

            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioCtx = new AudioContextClass();
            
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            analyser.fftSize = 32; 
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const fireHugeExplosion = () => {
                const common = {
                    particleCount: 150,
                    spread: 70,
                    startVelocity: 80,
                    colors
                };
                myConfetti!({ ...common, angle: 60, origin: { x: 0, y: 1 } });
                myConfetti!({ ...common, angle: 120, origin: { x: 1, y: 1 } });
            };

            const startRain = () => {
                myConfetti!({
                    particleCount: 1,
                    startVelocity: 0, 
                    ticks: 300,
                    origin: {
                        x: Math.random(),
                        y: Math.random() - 0.2,
                    },
                    colors: [colors[Math.floor(Math.random() * colors.length)]],
                    shapes: ["square"],
                    gravity: Math.random() * 0.4 + 0.3,
                    scalar: Math.random() * 1 + 0.7,
                    drift: Math.random() * 2 - 1,
                });
                animationId = requestAnimationFrame(startRain);
            };

            const checkAudio = () => {
                if (!hasFired && analyser && audioRef.current) {
                    analyser.getByteFrequencyData(dataArray);
                    const bassValue = dataArray[0];

                    if (bassValue > 250 && audioRef.current.currentTime > 1.2) {
                        fireHugeExplosion();
                        hasFired = true;

                        dispatch(setIsBeated(true));
                        startRain();
                        
                        return;
                    }
                }
                if (!hasFired) {
                    animationId = requestAnimationFrame(checkAudio);
                }
            };

            checkAudio();

            return () => {
                if (animationId) cancelAnimationFrame(animationId);
                if (myConfetti) myConfetti.reset();
                if (source) source.disconnect();
                if (audioCtx) audioCtx.close();
            };
        }
    }, [isIntroOpening, audioRef, dispatch]);

    return (
        <canvas ref={canvasRef} className={styles.canvasContainer} />
    );
};

export default Confetti;