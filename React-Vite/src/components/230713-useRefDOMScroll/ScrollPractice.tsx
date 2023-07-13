import { useRef } from "react";

const ScrollPractice = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const handleScrollToElement = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
            // scrollIntoView() 메서드를 사용하여 원하는 요소가 화면에 나타나도록 스크롤을 이동시킴.
            // 버튼을 클릭하면 함수가 호출되어 targetRef.current 를 사용하여 DOM 요소를 가져온다.
            // 그런 다음 scrollIntoView() 메서드를 호출하여 해당 요소가 부드럽게 화면에 나타나도록 스크롤을 이동시킨다. 
        }
    };
    return (
        <div>
            <div ref={targetRef}>Target Element</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <button onClick={handleScrollToElement}>Scroll to Target</button>

        </div>
    );
};

export default ScrollPractice;