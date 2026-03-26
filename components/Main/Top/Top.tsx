import Image from "next/image";
import boardImg from "@/assets/images/board.svg"
import cakeImg from "@/assets/images/cake.png"
import hatImg from "@/assets/images/hat.svg"
import presentImg from "@/assets/images/present.svg"
import styles from "@/components/Main/Top/Top.module.scss";

const Top = () => {
    return (
        <div className={styles.top}>
            <div className={styles.title}>
                <h1 >Sagynysh ’s b ’day party</h1>
            </div>
            
            <div className={styles.content}>
                <Image className={styles.hat} src={hatImg} alt="hat" />
                <Image className={styles.present} src={presentImg} alt="present" />
                <Image className={styles.board} src={boardImg} alt="board" />

                <div className={styles.center}>
                    <div className={styles.date}>
                        <span>07</span>
                        <span>04</span>
                        <span>26</span>
                    </div>
                    <div className={styles.cake}>
                        <div className={styles.flame}></div>
                        <Image src={cakeImg} alt="cake" />
                    </div>
                    <div className={styles.time}>
                        20:00
                    </div>
                </div>

                <p className={styles.description}>An evening of laughter, art, music and unforgettable memories</p>
            </div>
        </div>
    );
}

export default Top;