// obj = {b : "asdqw"}
//<AvailableProduct parentVal={100} obj={obj} />
// obj.b = "qweqew"
// setObj(obj);
//<AvailableProduct parentVal={100} obj={obj} />

import { Button } from "@mui/material";
import { useState } from "react";

if (prevObj !== b) {

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

세션 스토리지 - 창 닫으면 없어지니까
로컬 스토리지 

React 의 컴포넌트가 어떻게 화면을 그리는지;