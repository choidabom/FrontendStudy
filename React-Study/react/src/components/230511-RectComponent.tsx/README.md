// obj = {b : "asdqw"}
//<AvailableProduct parentVal={100} obj={obj} />
// obj.b = "qweqew"
// setObj(obj);
//<AvailableProduct parentVal={100} obj={obj} />

if(prevObj !== b) {

}
const Parent = () => {
    const [b, setB] = useState<string>('a');
    const [obj, setObj] = useState<any>({});

    return <div>
        <Button onClick={() => {
            let newB = b + "A";
            setB(newB);

        }}>Click B</Button>
        <Button onClick={() => {
            obj.b = "ASDSAD";
            setObj(obj);
        }}>Click</Button>
        <AvailableProduct parentVal={100} obj={obj} />
    </div>;
};