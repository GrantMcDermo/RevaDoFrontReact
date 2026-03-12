type Props = {
    username: string;
    onLogout: () => void;
};

export default function TaskPageHeader({ username, onLogout }: Props) {
    return (
        <header className="card page-header">
            <div>
                <h1>RevaDo</h1>
                <p>Welcome, {username}!</p>
            </div>
            <button type="button" className="btn btn-ghost" onClick={onLogout}>Logout</button>
        </header>
    );
}