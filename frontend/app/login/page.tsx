"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "../components/AuthInput";
import AuthBtn from "../components/BtnComponents/AuthBtn";
import TitleTxt from "../components/Titletxt";
import ErrorTxt from "../components/ErrorTxt";
import { formValidate } from "../utils/formValidate";
import regex from "../utils/regex";
import { apiService } from "../services/apiService";
import NavLayout from "../components/NavLayout";
import SocialBtn from "../components/BtnComponents/SocialBtn";

const SOCIAL_IMG = ["kakao", "google", "naver"];

export default function Login() {
  const router = useRouter();

  const [authInp, setAuthInp] = useState({
    email: "",
    password: "",
  });

  // 오류메세지 상태 저장
  const [error, setError] = useState({
    emailErrorTxt: "",
    passwordErrorTxt: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  // pass가 true로 바뀌면 버튼 활성화
  const isFormValid = isValid.email && isValid.password;

  const handleAuthInputChange = (e: any) => {
    const { value, name } = e.target;
    setAuthInp({
      ...authInp,
      [name]: value,
    });

    // 유효성 검사 및 오류 상태 업데이트
    if (name === "email") {
      const isEmailValid = formValidate(value, regex.EMAIL_CHECK);
      setError((prevErrors) => ({
        ...prevErrors,
        emailErrorTxt: isEmailValid ? "" : "유효하지 않은 이메일 입니다.",
      }));
      setIsValid((prevValid) => ({
        ...prevValid,
        email: isEmailValid,
      }));
    } else if (name === "password") {
      const isPasswordValid = formValidate(value, regex.PASSWORD_CHECK);
      setError((prevErrors) => ({
        ...prevErrors,
        passwordErrorTxt: isPasswordValid
          ? ""
          : "숫자 포함 8자 이상 입력해주세요",
      }));
      setIsValid((prevValid) => ({
        ...prevValid,
        password: isPasswordValid,
      }));
    }
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await apiService.post("/accounts/login/", {
        email: authInp.email,
        password: authInp.password,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
    } catch (error: any) {
      console.error("Login failed: ", error.message);
    }
    router.push("/record");
  };

  const moveToSignUp = () => {
    router.push("/signup");
  };

  return (
    <NavLayout>
      <TitleTxt titleTxt="로그인" />

      <section className="flex flex-col justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center p-2.5 bg-white"
        >
          <AuthInput
            name="email"
            htmlFor="email"
            id="email"
            labelTxt="이메일"
            placeholder="예) welcome@naver.com"
            type="text"
            value={authInp.email}
            onChange={handleAuthInputChange}
          />
          {error.emailErrorTxt && <ErrorTxt errorTxt={error.emailErrorTxt} />}
          <AuthInput
            name="password"
            htmlFor="password"
            id="password"
            labelTxt="비밀번호"
            placeholder="숫자 포함 8글자 이상 입력해주세요"
            type="password"
            value={authInp.password}
            onChange={handleAuthInputChange}
          />
          {error.passwordErrorTxt && (
            <ErrorTxt errorTxt={error.passwordErrorTxt} />
          )}
          <AuthBtn btnTxt={"이메일로 로그인하기"} disabled={!isFormValid} />
        </form>
        <button
          type="button"
          onClick={moveToSignUp}
          className="mt-8 text-sm text-center"
        >
          이메일로 회원가입
        </button>
        <div className="flex justify-center gap-8 mt-8">
          {SOCIAL_IMG.map((imgNme, index) => {
            return <SocialBtn key={index} imgNme={imgNme} />;
          })}
        </div>
      </section>
    </NavLayout>
  );
}