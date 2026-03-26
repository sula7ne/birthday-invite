import Countdown from "../Countdown/Countdown";
import Date from "../Date/Date";
import Image from "next/image";
import decorativeImg from "@/assets/images/decorative.svg"
import hbImg from "@/assets/images/hb.png"
import sevenImg from "@/assets/images/7.png"
import styles from "@/components/Main/Center/Center.module.scss";
import twoImg from "@/assets/images/2.png"

const Center = () => {
    return (
        <div className={styles.center}>
            <Image className={styles.rope} src={hbImg} alt="happy birthday" />

            <Date />

            <div className={styles.years}>
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