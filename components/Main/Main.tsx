import Bottom from "./Bottom/Bottom";
import Center from "./Center/Center";
import Confetti from "../Animations/Confetti/Confetti";
import { RefObject } from "react";
import Top from "./Top/Top";
import styles from "@/components/Main/Main.module.scss"

interface MainProps {
    audioRef: RefObject<HTMLAudioElement | null>;
}

const Main = ({ audioRef }: MainProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Confetti audioRef={audioRef} />

                <Top />
                <Center />
                <Bottom />
            </div>
        </main>
    );
}

export default Main;