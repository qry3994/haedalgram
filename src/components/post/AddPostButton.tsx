// src/components/post/AddPostButton.tsx

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useModalStore from "../../store/modalStore";
import AddPostModal from "../modal/AddPostModal";

const Button = styled.button`
  width: 50px;
  height: 50px;

  position: fixed;
  bottom: 40px;
  right: 64px;

  border: none;
  background-color: var(--color-blue-1);
  border-radius: 20px;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

/*
상태 관리: useModalStore 훅을 통해 모달의 열림 여부 (isOpenAddPostModal)와 모달을 여는 함수 (openAddPostModal)를 가져옵니다.
버튼 클릭 핸들러: 버튼이 클릭되면 onClickOpenAddPostModal 함수가 호출되어 openAddPostModal을 실행합니다.
openAddPostModal 함수는 Zustand 상태를 업데이트하여 모달이 열리도록 설정합니다.
조건부 렌더링: isOpenAddPostModal이 true일 때만 AddPostModal 컴포넌트를 렌더링합니다. 이는 모달이 화면에 보이도록 하는 로직입니다.
*/
const AddPostButton = () => {
  const { isOpenAddPostModal, openAddPostModal } = useModalStore();

  const onClickOpenAddPostModal = () => {
    openAddPostModal();
  };

  return (
    <>
      <Button onClick={onClickOpenAddPostModal}>
        <FontAwesomeIcon icon={faPlus} size="xl" color="white" />
      </Button>
      {isOpenAddPostModal && <AddPostModal />}
    </>
  );
};

export default AddPostButton;
