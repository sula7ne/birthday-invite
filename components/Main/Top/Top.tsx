import { useEffect, useRef } from "react";

import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import boardImg from "@/assets/images/board.svg"
import cakeImg from "@/assets/images/cake.png"
import gsap from "gsap";
import hatImg from "@/assets/images/hat.svg"
import presentImg from "@/assets/images/present.svg"
import styles from "@/components/Main/Top/Top.module.scss";

const Top = () => {
    const descriptionRef = useRef<HTMLHeadingElement>(null);
    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: descriptionRef.current,
                    start: "top 100%", 
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(descriptionRef.current, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
        }, descriptionRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div className={styles.top}>
            <Image className={styles.hat} src={hatImg} alt="hat" />
            <Image className={styles.present} src={presentImg} alt="present" />
            <Image className={styles.board} src={boardImg} alt="board" />
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <h1 >Sagynysh ’s b ’day party</h1>
                </div>
            
                <div className={styles.content}>
                    <div className={styles.center}>
                        <div className={styles.cake}>
                            <Image src={cakeImg} alt="cake" />
                        </div>

                        <div className={styles.container}>
                            <div className={styles.date}>
                                <span>07</span>
                                <span>04</span>
                                <span>26</span>
                            </div>

                            <div className={styles.time}>
                                20:00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <p ref={descriptionRef} className={styles.description}>An evening of laughter, art, music and unforgettable memories</p>
        </div>
    );
}

export default Top;