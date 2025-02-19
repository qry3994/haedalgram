// src/components/common/Modal.tsx

import styled from "styled-components";

/*
Props 타입 정의
이 모달 컴포넌트는 세 가지 props를 받습니다:
title: 모달의 제목을 나타냅니다.
close: 모달을 닫는 함수입니다.
children: 모달 내부에 렌더링될 JSX 요소입니다.
*/
type Props = {
  title: string;
  close(): void;
  children: JSX.Element;
};

const BackgroundDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentDiv = styled.div`
  background-color: var(--color-white);
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
`;

const TitleP = styled.p`
  height: 40px;

  line-height: 40px;
  text-align: center;

  border-bottom: 1px solid var(--color-grey-2);
`;

/*
Modal 컴포넌트
Modal 컴포넌트는 title, close, children을 props로 받아 화면에 모달을 렌더링합니다.
BackgroundDiv는 모달의 배경 역할을 하며, 클릭 시 close 함수를 호출하여 모달을 닫습니다.
ContentDiv는 모달의 내용물을 담고 있으며, TitleP로 제목을 표시한 후 children을 렌더링합니다.
*/
const Modal = ({ title, close, children }: Props) => {
  return (
    <>
      <BackgroundDiv onClick={close} />
      <ContentDiv>
        <TitleP>{title}</TitleP>
        {children}
      </ContentDiv>
    </>
  );
};

export default Modal;
