"use client";

import { useEffect, useRef } from "react";

import confetti from "canvas-confetti";
import styles from "@/components/Animations/Confetti/Confetti.module.scss";
import { useAppSelector } from "@/state/hooks";

interface ConfettiProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const Confetti = ({ audioRef }: ConfettiProps) => {
    const { isIntroOpening } = useAppSelector(state => state.app);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let animationId: number;
        let myConfetti: confetti.CreateTypes | null = null;
        let audioCtx: AudioContext | null = null;
        let analyser: AnalyserNode | null = null;
        let source: MediaElementAudioSourceNode | null = null;
        let hasFired = false; // Предохранитель, чтобы взрыв был только один раз

        if (isIntroOpening && canvasRef.current && audioRef.current) {
            myConfetti = confetti.create(canvasRef.current, { resize: true, useWorker: true });
            const colors = ["#fce18a", "#ff726d", "#b48def", "#f4306d", "#42a5f5", "#66bb6a", "#ffa726"];

            // Настройка анализатора
            audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(audioRef.current);
            
            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            analyser.fftSize = 32; 
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const fireHugeExplosion = () => {
                const common = {
                    particleCount: 120,
                    spread: 70,
                    startVelocity: 80,
                    colors
                };
                // Залп слева и справа одновременно
                myConfetti!({ ...common, angle: 60, origin: { x: 0, y: 1 } });
                myConfetti!({ ...common, angle: 120, origin: { x: 1, y: 1 } });
            };

            const checkAudio = () => {
                if (hasFired) return;

                analyser!.getByteFrequencyData(dataArray);
                const bassValue = dataArray[0]; 

                if (bassValue > 250 && audioRef.current!.currentTime > 1.2) {
                    fireHugeExplosion();
                    hasFired = true;
                    
                    cancelAnimationFrame(animationId);
                    return;
                }

                animationId = requestAnimationFrame(checkAudio);
            };

            checkAudio();

            return () => {
                if (animationId) cancelAnimationFrame(animationId);
                if (myConfetti) myConfetti.reset();
                if (source) source.disconnect();
            };
        }
    }, [isIntroOpening, audioRef]);

    return <canvas ref={canvasRef} className={styles.canvasContainer} />;
};

export default Confetti;