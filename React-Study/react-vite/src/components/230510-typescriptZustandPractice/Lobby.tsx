import IdStore from "./IdStore";

const Lobby = () => {
    const { id } = IdStore();
    return (
        <>
            <p>Lobby</p>
            <p>name: {id}</p>
        </>
    );
};

export default Lobby;