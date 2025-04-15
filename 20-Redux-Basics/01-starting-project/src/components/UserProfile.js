import classes from "./UserProfile.module.css";

const UserProfile = () => {
    return (
        <main className={classes.profile}>
            <h2>My User Profile</h2>
            <p>
                <strong>Dat Phan</strong>
            </p>
            <p>Ho Chi Minh City, Viet Nam</p>
            <a href="https://datphan.me" target="_blank">
                Portfolio
            </a>
        </main>
    );
};

export default UserProfile;
