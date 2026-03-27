"use client"

import { GuestForm, guestForm } from "@/schemas/guest.schema";
import { useEffect, useRef, useState } from "react";

import PopUp from "../PopUp/PopUp";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addGuest } from "@/state/slices/guestsSlice";
import gsap from "gsap";
import styles from "@/components/Form/Form.module.scss";
import { useAppDispatch } from "@/state/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState(false);
    const [isPopUp, setIsPopUp] = useState(true);
    const [isCome, setIsCome] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<GuestForm>({
        resolver: zodResolver(guestForm),
        defaultValues: {
            name: "",
            isCome: "true",
            comment: "",
        },
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(titleRef.current, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            )
            .fromTo(`.${styles['form-el']}`, 
                { opacity: 0, y: 20 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.15,
                    ease: "power2.out" 
                },
                "-=0.3"
            )
            
            .fromTo(btnRef.current, 
                { opacity: 0, scale: 0.9 }, 
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                "-=0.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const onSubmit = async (data: GuestForm) => {
        try {
            const formattedData = { ...data, isCome: data.isCome === "true" };
            setIsCome(formattedData.isCome);

            setSuccess(true);
            setIsPopUp(true);
            reset();

            dispatch(addGuest(formattedData))
                .unwrap()
                .catch(() => setSuccess(false));
        } catch(e) { console.log(e); }
    };

    return (
        <div ref={sectionRef} className={styles.form}>
            <h2 ref={titleRef} className={styles.title}>Анкета</h2>

            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['form-el']}>
                    <label htmlFor="name">Имя</label>
                    <input id="name" type="text" placeholder="Ирина Кайратовна" {...register("name")} />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>

                <div className={styles['form-el']}>
                    <label>Получится ли прийти?</label>
                    <div className={styles.radio}>
                        <label>
                            <input type="radio" value="true" {...register("isCome")} /> Да
                        </label>
                        <label>
                            <input type="radio" value="false" {...register("isCome")} /> Нет
                        </label>
                    </div>
                </div>

                <div className={styles['form-el']}>
                    <label htmlFor="comment">Комментарий</label>
                    <input id="comment" type="text" placeholder="Вопросы" {...register("comment")} />
                    {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}
                </div>

                <button 
                    ref={btnRef} 
                    className={styles.submit} 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    Отправить
                </button>

                {success && isPopUp && <PopUp isCome={isCome} setIsPopUp={setIsPopUp} />}
            </form>
        </div>
    );
}

export default Form;