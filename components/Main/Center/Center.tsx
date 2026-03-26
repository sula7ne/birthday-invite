import { useEffect, useRef } from "react";

import Countdown from "../Countdown/Countdown";
import Date from "../Date/Date";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import decorativeImg from "@/assets/images/decorative.svg"
import gsap from "gsap";
import hbImg from "@/assets/images/hb.png"
import sevenImg from "@/assets/images/7.png"
import styles from "@/components/Main/Center/Center.module.scss";
import twoImg from "@/assets/images/2.png"

const Center = () => {
    const yearsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (yearsRef.current) {
                const images = yearsRef.current.querySelectorAll('img');
                const span = yearsRef.current.querySelector('span');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: yearsRef.current,
                        start: "top 40%",
                        toggleActions: "play none none none",
                    }
                });

                tl.fromTo(images, 
                    { opacity: 0, scale: 0.5, y: 50 }, 
                    { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0, 
                        duration: 0.8, 
                        stagger: 0.2, 
                        ease: "back.out(1.7)" 
                    }
                )

                .fromTo(span, 
                    { opacity: 0, y: 10 }, 
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );
            }
        }, yearsRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div className={styles.center}>
            <Image className={styles.rope} src={hbImg} alt="happy birthday" />

            <Date />

            <div ref={yearsRef} className={styles.years}>
                <Image src={twoImg} alt="2" />
                <Image src={sevenImg} alt="7" />

                <span>with me</span>
            </div>

            <Countdown />

            <Image className={styles.decorative} src={decorativeImg} alt="decorative" />
        </div>
    );
}

export default Center;