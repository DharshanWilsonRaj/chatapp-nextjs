import styles from './sidebar.module.scss';

const Sidebar = ({ setReceiver = () => { } }) => {
    const LoggedUser = JSON.parse(localStorage.getItem('logged_user'));
    const usersList = [
        { name: "Karan", id: 1, email: "karan@gmail.com", password: "123456" },
        { name: "Ajith", id: 2, email: "Ajith@gmail.com", password: "123456" },
        { name: "vivek", id: 3, email: "vivek@gmail.com", password: "123456" },
    ]
    return (
        <div className={styles.sidebar}>
            <div >
                <input type="text" placeholder="search users" className={styles.input} />
            </div>
            {usersList.map((user, index) => user.id !== LoggedUser?.id && (
                <div key={index} className={styles.user} onClick={() => setReceiver(user)}>
                    {user?.name}
                </div>
            ))}
        </div>
    )
}

export default Sidebar
