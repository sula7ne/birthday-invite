interface ErrorProps {
    message: string
}

const Error = ({ message }: ErrorProps) => {
    return (
        <div>
            <p>Ошибка...</p>
            <p>{message}</p>
        </div>
    );
}

export default Error;