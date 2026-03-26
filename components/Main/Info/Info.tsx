import styles from "@/components/Main/Info/Info.module.scss";

const Info = () => {
    return (
        <div className={styles.info}>
            <h2 className={styles.title}>Дорогие гости!</h2>
            <p className={styles.description}>Мы очень хотим сделать этот день особенным, поэтому приглашаем Вас разделить с нами торжество, посвященное дню нашей свадьбы!</p>
        </div>
    );
}

export default Info;