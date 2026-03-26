"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "@/components/Main/Countdown/Countdown.module.scss";

const Countdown = () => {

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

    const format = (n: number) => String(n).padStart(2, "0");

    return (
        <div className={styles.countdown}>
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