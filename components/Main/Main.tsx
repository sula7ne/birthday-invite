import Bottom from "./Bottom/Bottom";
import Center from "./Center/Center";
import Confetti from "../Animations/Confetti";
import Top from "./Top/Top";
import styles from "@/components/Main/Main.module.scss"

const Main = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Confetti />

                <Top />
                <Center />
                <Bottom />
            </div>
        </main>
    );
}

export default Main;