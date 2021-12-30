# Gulp-Application
React native 프로젝트 어플리케이션 '꿀꺽' 입니다. 영양제 복용알람 서비스 앱으로, 기본 CRUD 기능에 충실하며, '자동검색', 'Navigator 구조', 'react native Animation' 등 다양한 부가 기능들을 추가하였습니다.


## 앱 화면

### 회원가입&로그인
1. 회원가입 - 약관동의
2. 닉네임, 이메일, 비밀번호 입력 + 이메일 중복확인
3. 로그인 진행(다양한 경우의 수)


![08](https://user-images.githubusercontent.com/86715916/147720449-00611f88-3b35-4ccc-bdb5-2deb7fbb31f8.png)
![09](https://user-images.githubusercontent.com/86715916/147720451-1c566adf-aac5-4897-a84e-b64e86ade0de.png)
![10](https://user-images.githubusercontent.com/86715916/147720452-8e43249c-e906-45e5-9515-2eeac4d1ab2d.png)
![11](https://user-images.githubusercontent.com/86715916/147720453-8b41ba63-500e-45b5-b97a-e92a5b1d2f1a.png)


---
### 알람 생성하기
1. 복용시간 선택 - 복용요일 선택
2. 복용중인 영양제 검색하여 추가
3. 검색되는 데이터가 없는 경우 신규 등록


![02](https://user-images.githubusercontent.com/86715916/147720441-fcb402fd-08f1-4897-99a5-cdef6eb97afe.png)
![03](https://user-images.githubusercontent.com/86715916/147720442-a2b14dcc-d0b5-48bf-8f08-215a3fae2972.png)
![04](https://user-images.githubusercontent.com/86715916/147720443-3e0deecf-7d41-4730-bb45-ea14c7c92d15.png)
![05](https://user-images.githubusercontent.com/86715916/147720446-32f72e06-d062-4de3-b8c1-14710b4ca335.png)
![06](https://user-images.githubusercontent.com/86715916/147720447-8f440973-f0c6-40db-a034-a0951b785f37.png)


---
### 캘린더
1. 캘린더 월 넘기기, 해당 날짜의 알람 확인

![07](https://user-images.githubusercontent.com/86715916/147720448-4188f902-fcfd-49c2-86e4-8867c88f3c51.png)

---
### 랭크
1. 영양제 종류 별 순위 확인


![13](https://user-images.githubusercontent.com/86715916/147720455-9675c70b-d2f2-41d5-87f4-391e97c89560.png)

---
### 마이페이지
1. 회원정보 변경
2. 레벨별 타이틀 확인(스와이프), 로그아웃


![14](https://user-images.githubusercontent.com/86715916/147720456-d5445c07-d96d-4228-91af-cc00339417db.png)
<img width="375" alt="15" src="https://user-images.githubusercontent.com/86715916/147720457-7e339ebc-86f7-47f2-bcf5-e741acfb438d.png">
![16](https://user-images.githubusercontent.com/86715916/147720458-4e6853ac-ef0b-414d-90d7-933342fab376.png)





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
