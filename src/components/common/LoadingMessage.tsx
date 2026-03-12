type Props = { message: string };

export default function LoadingMessage({ message = "Loading..." }: Props) {
    return <p>{message}</p>;
}