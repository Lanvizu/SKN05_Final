// "use client";

// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function AuthGoogle() {
//   const router = useRouter();

//   const fetchAuthData = async () => {
//     const code = new URL(window.location.href).searchParams.get("code");

//     try {
//       const response = await axios.get(
//         `http://52.78.40.197:8000/accounts/google/login-request/?code=${code}`
//       );

//       const accessToken = response.data.access;
//       const refreshToken = response.data.refresh;

//       localStorage.setItem("access", accessToken);
//       localStorage.setItem("refresh", refreshToken);

//       router.push("/record");
//     } catch (error: any) {
//       console.error("오류:", error.message);
//     }
//   };

//   fetchAuthData();

//   return <div>구글 소셜로그인 중입니다...</div>;
// }