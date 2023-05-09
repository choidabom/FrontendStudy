import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ParentComponent from './components/propsExample/ParentComponent';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            {/* 라우터 기술을 사용할 모든 컴포넌트를 감싸줌 */}
            <BrowserRouter>
                {/*  Routes 밖은 바뀌지 않을 컴포넌트 */}
                <Routes>
                    {/* 페이지 변환시 바뀔 컴포넌트 작성, path 속성은 경로, element 속성은 컴포넌트 작성 */}
                    <Route path='/' element={<ParentComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;