# Gulp-Application
React native 프로젝트 어플리케이션 '꿀꺽' 입니다. 영양제 복용알람 서비스 앱으로, CRUD 기능과 '자동검색', 'Stack/tab Navigator', 'Rest Api' 등 다양한 부가 기능들을 추가하였습니다.

[프로젝트 포트폴리오 상세 보기](http://jenyglee93.com/1/0)


## 앱 화면

### 회원가입&로그인


![08](https://user-images.githubusercontent.com/86715916/147720449-00611f88-3b35-4ccc-bdb5-2deb7fbb31f8.png)
![09](https://user-images.githubusercontent.com/86715916/147720451-1c566adf-aac5-4897-a84e-b64e86ade0de.png)
![10](https://user-images.githubusercontent.com/86715916/147720452-8e43249c-e906-45e5-9515-2eeac4d1ab2d.png)
![11](https://user-images.githubusercontent.com/86715916/147720453-8b41ba63-500e-45b5-b97a-e92a5b1d2f1a.png)


---
### 알람 생성하기


![02](https://user-images.githubusercontent.com/86715916/147720441-fcb402fd-08f1-4897-99a5-cdef6eb97afe.png)
![03](https://user-images.githubusercontent.com/86715916/147720442-a2b14dcc-d0b5-48bf-8f08-215a3fae2972.png)
![04](https://user-images.githubusercontent.com/86715916/147720443-3e0deecf-7d41-4730-bb45-ea14c7c92d15.png)
![05](https://user-images.githubusercontent.com/86715916/147720446-32f72e06-d062-4de3-b8c1-14710b4ca335.png)


---
### 캘린더

![07](https://user-images.githubusercontent.com/86715916/147720448-4188f902-fcfd-49c2-86e4-8867c88f3c51.png)

---
### 랭크


![13](https://user-images.githubusercontent.com/86715916/147720455-9675c70b-d2f2-41d5-87f4-391e97c89560.png)

---
### 마이페이지


![14](https://user-images.githubusercontent.com/86715916/147720456-d5445c07-d96d-4228-91af-cc00339417db.png)
![15](https://user-images.githubusercontent.com/86715916/147720661-0b3b78af-4167-4236-a0e8-56abd10c5f5f.png)
![16](https://user-images.githubusercontent.com/86715916/147720458-4e6853ac-ef0b-414d-90d7-933342fab376.png)





## 주요기능
1. 알람 생성(복용시간, 복용요일, 복용중인 영양제 등록)/수정/삭제
2. 영양제 복용완료 횟수(경험치)에 따른 레벨링 디자인
3. 이번달의 복용 달성률 확인
4. 영양제 종류별 순위 확인
5. 등록한 알람 시간에 푸쉬알림
6. 회원가입, 로그인
7. 이메일 중복확인
8. 회원정보 변경
9. 회원탈퇴



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

## 구현의 어려움 및 이슈

### <AlarmList />
#### 알람 변경/삭제 응용하기(feat. bind())
등록되어있는 알람을 변경/삭제하는 과정에서, 알람에 있는 메뉴 버튼을 눌러 모달 창을 띄우고, 그 안에서 ‘변경하기’ or ‘지우기’를 눌러 해당 알람을 컨트롤해야 했습니다. 이 과정에서 문제는 모달에 있는 버튼을 누르면 이때 컨트롤할 알람이 무엇인지 알 수 없다는 것이었습니다. 제가 공부하며 배웠던 delete, update의 기능은 모달창을 건너지 않고 바로 컨트롤했었기에, 현재 해당 알람을 컨트롤하기 위해서는 메뉴 버튼을 눌렀던 알람의 id를 파라미터로 넘겨주어야 했습니다.

이용자가 메뉴를 누른 알람의 id를 state에 저장해놓은 뒤, ‘변경하기’ or ‘지우기’ 버튼을 눌렀을 때 ‘bind’ 메서드로 state에 저장된 알람의 id를 파라미터로 전달하여 컨트롤할 수 있도록 구현했습니다.

#### 데이터 쪼개고 다듬고 요리하기

api를 이용하여 알람 정보를 가져오면 요일, 시간, 영양제, 유저정보를 불러옵니다. 이때 대부분 데이터는 제 컴포넌트에 들어가기에 적절하지 않은 형태로 되어있었습니다. 예를들어 ‘배열형태, 한글’을 기준으로 만들어둔 컴포넌트에 ‘문자열, 숫자’ 형태의 데이터로 되어있고, ‘3:30 pm’ 형태로 컴포넌트에 들어갈 데이터는 ’15:30:00’ 형태로 되어있었습니다. 이런 데이터들은 새롭게 다듬을 필요가 있었기에 여러가지 자바스크립트 메서드를 이용하여 데이터를 쪼개고 다듬어 컴포넌트에 입힐 수 있었습니다.
