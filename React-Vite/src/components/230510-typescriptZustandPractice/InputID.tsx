import { useNavigate } from "react-router-dom";
import IdStore from "./IdStore";

const InputID = () => {
    const navigate = useNavigate();
    const { id, setId } = IdStore();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/lobby');
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    autoComplete="off"
                    onChange={onChange}
                    placeholder="Enter ID"
                />
                <button disabled={!id.length}>Enter</button>
            </form>
        </>
    );
};

export default InputID;