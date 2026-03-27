"use client";

import { useEffect, useRef } from "react";

import confetti from "canvas-confetti";
import styles from "@/components/Animations/Confetti/Confetti.module.scss";
import { useAppSelector } from "@/state/hooks";

const Confetti = () => {
    const { isIntroOpening } = useAppSelector(state => state.app);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let startTimeout: NodeJS.Timeout;
        let animationId: number;
        let myConfetti: confetti.CreateTypes | null = null;

        if (isIntroOpening) {
            if (!canvasRef.current) return;

            myConfetti = confetti.create(canvasRef.current, {
                resize: true,
                useWorker: true,
            });

            const colors = ["#fce18a", "#ff726d", "#b48def", "#f4306d", "#42a5f5", "#66bb6a", "#ffa726"];

            const fireCannons = () => {
                const common = {
                    particleCount: 70,
                    spread: 60,
                    startVelocity: 80,
                    gravity: 0.8,
                    colors
                };
                myConfetti!({ ...common, angle: 65, origin: { x: 0, y: 0.9 } });
                myConfetti!({ ...common, angle: 115, origin: { x: 1, y: 0.9 } });
            };

            const renderFrame = () => {
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

                animationId = requestAnimationFrame(renderFrame);
            };

            startTimeout = setTimeout(() => {
                fireCannons();
                renderFrame();
            }, 1500); 

            return () => {
                clearTimeout(startTimeout);
                
                if (animationId) cancelAnimationFrame(animationId);
                if (myConfetti) myConfetti.reset();
            };
        }
    }, [isIntroOpening]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvasContainer}
        />
    );
};

export default Confetti;