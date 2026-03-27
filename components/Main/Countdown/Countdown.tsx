"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "@/components/Main/Countdown/Countdown.module.scss";

const Countdown = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateTime = useCallback(() => {
        const targetDate = new Date("2026-04-07T20:00:00");
        
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0 }; // , seconds: 0 
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            // seconds: Math.floor((diff / 1000) % 60),
        };
    }, [])

    const [time, setTime] = useState(calculateTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTime());
        }, 60000); // минут

        return () => clearInterval(interval);
    }, [calculateTime]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.fromTo(containerRef.current.children, 
                    { 
                        opacity: 0, 
                        y: 40 
                    }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const format = (n: number) => String(n).padStart(2, "0");

    return (
        <div ref={containerRef} className={styles.countdown}>
            <div className={styles.item}>
                <span>{format(time.days)}</span>
                <p>Дней</p>
            </div>

            <div className={styles.item}>
                <span>{format(time.hours)}</span>
                <p>Часов</p>
            </div>

            <div className={styles.item}>
                <span>{format(time.minutes)}</span>
                <p>Минут</p>
            </div>

            {/* <div className={styles.item}>
                <span>{format(time.seconds)}</span>
                <p>Секунд</p>
            </div> */}
        </div>
    );
};

export default Countdown;