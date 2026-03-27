import { useEffect, useRef } from "react";

import Image from "next/image";
import cakeImg from "@/assets/images/cake.png";
import gsap from "gsap";
import styles from "@/components/Animations/Cake/Cake.module.scss";
import { useAppSelector } from "@/state/hooks";

const Cake = () => {
    const { isBeated } = useAppSelector(state => state.app);
    const svgRef = useRef<SVGSVGElement>(null);

    const candles = [
        { x: 115, y: 80 }, { x: 139, y: 58 }, { x: 163, y: 68 }, { x: 200, y: 75 },
        { x: 238, y: 50 }, { x: 285, y: 98 }, { x: 328, y: 70 }, { x: 355, y: 75 }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(`.${styles.flameContainer}`, { 
                scale: 0, 
                opacity: 0, 
                transformOrigin: "bottom center" 
            });

            if (isBeated) {
                gsap.to(`.${styles.flameContainer}`, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "back.out(2)",
                    onStart: () => {
                        gsap.to(`.${styles.cakeImage}`, { 
                            x: 2, 
                            duration: 0.05, 
                            repeat: 5, 
                            yoyo: true 
                        });
                    }
                });
            }
        }, svgRef);

    return () => ctx && ctx.revert();
}, [isBeated]);
    
    return (
        <div className={styles.cake}>
            <Image src={cakeImg} alt="cake" priority className={styles.cakeImage} />

            <svg 
                ref={svgRef}
                className={styles.flamesOverlay} 
                viewBox="0 0 418 743" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <path id="flame-shape" d="M0,0 C-10,-5 -12,-15 0,-50 C22,-15 10,-5 0,0 Z" />
                    
                    <radialGradient id="individualGlow">
                        <stop offset="0%" stopColor="#ffbb00" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#fec20e" stopOpacity="0" />
                    </radialGradient>
                </defs>
                
                {candles.map((candle, index) => (
                    <g 
                        key={index} 
                        className={styles.flameContainer}
                        transform={`translate(${candle.x}, ${candle.y})`}
                    >
                        <circle 
                            cx="0" cy="-20" r="80" 
                            fill="url(#individualGlow)" 
                            className={styles.individualGlow} 
                        />
                        
                        <use href="#flame-shape" className={`${styles.mainFlame} ${styles.flameLayer1}`} />
                        <use href="#flame-shape" className={`${styles.mainFlame} ${styles.flameLayer2}`} />
                        <use href="#flame-shape" className={`${styles.mainFlame} ${styles.flameLayer3}`} />
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default Cake;