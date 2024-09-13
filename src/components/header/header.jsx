
const Header = ({ user }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Next Js Chat Application </h1>
            <h1>{user?.name} </h1>
        </div>
    )
}

export default Header
