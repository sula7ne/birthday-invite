import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "@/components/Main/Location/Location.module.scss";

const Location = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 100%", 
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(titleRef.current, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(descRef.current ? Array.from(descRef.current.children) : [], 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(btnRef.current, 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div ref={sectionRef} className={styles.location}>
            <h2 ref={titleRef} className={styles.title}>Локация</h2>
            <p ref={descRef} className={styles.description}>
                <span>БЦ Mercury </span>
                <span>Камзина 64/4, 2 этаж</span>
            </p>
            
            <a ref={btnRef} className={styles.route} href="https://2gis.kz/pavlodar/inside/15622496862602537/firm/70000001101375201">Построить маршрут</a>
        </div>
    );
}

export default Location;