# Gulp-Application
React native 프로젝트 어플리케이션 '꿀꺽' 입니다. 영양제 복용알람 서비스 앱으로, 기본 CRUD 기능에 충실하며, '자동검색', 'Navigator 구조', 'react native Animation' 등 다양한 부가 기능들을 추가하였습니다.


# 시뮬레이션 화면

#### 회원가입&로그인
1. 회원가입 - 약관동의
2. 닉네임, 이메일, 비밀번호 입력 + 이메일 중복확인
3. 로그인 진행(다양한 경우의 수)

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/86715916/147677065-0d9222ac-e6a7-4fd4-87f4-05c0ab080d8d.gif)
![ezgif com-gif-maker](https://user-images.githubusercontent.com/86715916/147677233-4b421f00-d023-4c4b-9099-88f04a741c99.gif)
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/86715916/147677509-83bb8081-0863-43a3-a8fb-3959a5671f89.gif)
---
#### 알람 생성하기
![ezgif com-gif-maker](https://user-images.githubusercontent.com/86715916/147677996-9b2c886a-2a81-435e-91a9-d28ae2f59069.gif)
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/86715916/147678000-478f4d6a-f00e-4c23-8297-e0b5b8dcbcc9.gif)
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/86715916/147678623-e5d784c7-4b33-4e7d-a334-ace9406eb9f5.gif)




## 주요기능
1. 알람 생성(복용시간, 복용요일, 복용중인 영양제 등록)/수정/삭제
2. 영양제 복용완료 횟수(경험치)에 따른 레벨링 디자인
3. 이번달의 복용 달성률 확인
4. 영양제 종류별 순위 확인
5. 등록한 알람 시간에 푸쉬알림


## 부가기능
1. 회원가입, 로그인
2. 이메일 중복확인
3. 회원정보 변경
4. 회원탈퇴


## 구현 컴포넌트 및 라이브러리
- styled-components
- jwt-decode
- axios
- react-redux
- redux-thunk
- firebase
- lodash
- react-native-calendars
- react-native-swiper
- expo image picker
