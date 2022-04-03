import styles from "../styles/Home.module.css";

const Login = () => {
	const AUTHURL =
    "https://accounts.spotify.com/authorize?client_id=7f16edd9e41e45b79bcc064c4a02717d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

        return (
            <div className={styles.loginContainer}>
                <a href={AUTHURL} className={styles.loginButton}> Login</a>
            </div>
        )
};

export default Login;
