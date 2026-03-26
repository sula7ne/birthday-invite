import Image from "next/image";
import outlineImg from "@/assets/images/outline.svg";
import styles from "@/components/Main/Date/Date.module.scss";

const Date = () => {
    return (
        <div className={styles.date}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Понедельник</th>
                        <th>Вторник</th>
                        <th>Среда</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.month}>Апрель</div>
                            <div className={styles.day}>6</div>
                        </td>
                        <td>
                            <div className={styles.month}>Апрель</div>
                            <div className={styles.day}>7</div>

                            <Image src={outlineImg} alt="выделенная клетка таблицы" /> 
                        </td>
                        <td>
                            <div className={styles.month}>Апрель</div>
                            <div className={styles.day}>8</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Date;