import Form from "@/components/Form/Form";
import Image from "next/image";
import Location from "../Location/Location";
import balloonsImg from "@/assets/images/balloons.svg"
import ropeImg from "@/assets/images/rope.svg"
import styles from "@/components/Main/Bottom/Bottom.module.scss";

const Bottom = () => {
    return (
        <div className={styles.bottom}>
            <Location />

            <Image className={styles.rope} src={ropeImg} alt="rope" />

            <Form />
            
            {/* <Image className={styles.balloons} src={balloonsImg} alt="balloons" /> */}
        </div>
    );
}

export default Bottom;