// src/components/sign/SignUpForm.tsx

import axios from "axios"; //HTTP 요청을 보내기 위한 라이브러리
import { useState } from "react";
import styled from "styled-components";
import { HOST } from "../../config"; //API의 기본 URL을 해당 config 파일에서 가져옴

//회원가입 요청에 필요한 데이터 구조 정의
type SignUpRequest = {
  name: string;
  username: string;
  password: string;
};

const Form = styled.form`
  width: 80%;

  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 40px;
  margin-top: 10px;
  padding: 5px 10px;

  border: 1px solid var(--color-grey-2);
  background-color: var(--color-grey-1);

  outline: none;
`;

const Button = styled.button`
  height: 30px;
  margin-top: 10px;

  font-size: 16px;
  color: var(--color-white);
  background-color: var(--color-blue-1);

  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(e.target.value);

/*
폼 제출 핸들러 추가
*/

  const onSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
//기본 폼 제출 동작을 막음
    e.preventDefault();

//유효성 검사
    if (
      name.length == 0 ||
      username.length == 0 ||
      password.length == 0 ||
      passwordConfirm.length == 0
    ) {
      alert("모든 필드는 공백이면 안 됩니다.");
      return;
    }

    // 비밀번호 검증
    if (password != passwordConfirm) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }

//signUpRequest 객체를 생성하여 axios를 통해 서버에 POST 요청을 보냅니다.
    const signUpRequest: SignUpRequest = {
      name,
      username,
      password,
    };

    axios
      .post(`${HOST}/auth/register`, signUpRequest)
      .then(() => {
        alert("회원가입이 성공하였습니다.");
      })
      .catch(() => {
        alert("회원가입이 실패하였습니다.");
      });
  };

  return (
  //폼이 제출될 때 onSubmitSignUp 함수가 호출
    <Form onSubmit={onSubmitSignUp}>
      <Input
        onChange={onChangeName}
        value={name}
        type="text"
        placeholder="Name"
      />
      <Input
        onChange={onChangeUsername}
        value={username}
        type="text"
        placeholder="Username"
      />
      <Input
        onChange={onChangePassword}
        value={password}
        type="password"
        placeholder="Password"
      />
      <Input
        onChange={onChangePasswordConfirm}
        value={passwordConfirm}
        type="password"
        placeholder="Password Confirm"
      />
      <Button>Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
