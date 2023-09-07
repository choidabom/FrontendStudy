import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

// 리액트 공식 문서 : The library for web and native user interfaces

/*
 * React: UI를 만들고 관리하는 JavaScript 라이브러리
 * ReactDOM: web 즉, 브라우저에서 사용하기 위해 사용하는 패키지
 * react native: IOS, Android를 동시에 개발할 수 있는 라이브러리
 */

/*
 * ReactDOM.createRoot: DOM 요소를 지정하고, 이후 렌더링 작업을 관리할 루트를 생성
 * document.getElementById('root'): HTML 문서에서 id가 root인 요소를 찾는 역할 / 이 요소가 렌더링할 대상
 * .render() 메서드: createRoot 메서드가 생성한 루트에 대해 .render() 메서드를 호출하여 실제 UI 생성
 * <App/>: React 컴포넌트인 App을 렌더링 / App 컴포넌트는 일반적으로 애플리케이션의 루트 컴포넌트로 사용되며, 애플리케이션의 UI를 정의
 */

/*
 * React 애플리케이션을 개발할 때 document.getElementById('root')를 사용하여 id가 'root'인 요소를 찾는 것이 일반적인 절차
 * 그러나 모든 브라우저가 id가 root인 요소를 가지고 있다고 가정하면 안 된다.
 * React 애플리케이션을 실행하려면 HTML 문서 내에 id가 'root'인 요소를 정의해야 한다. 
 * index.html에서 id가 'root'인 요소가 React 애플리케이션의 루트 역할을 하며, ReactDOM 라이브러리는 이 요소 내에 컴포넌트를 렌더링한다.
 */

/*
 * 결론적으로 이 코드는 React 애플리케이션의 시작 부분으로,
 * createRoot로 지정한 DOM 요소에 <App/> 컴포넌트를 렌더링하여 웹 페이지 내용을 구성한다. 
 */