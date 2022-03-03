<p align='center'>
  <img src="https://user-images.githubusercontent.com/85726838/156254529-961a9637-4e5a-4579-a525-0856fd0bcada.png" width=80% alt='logo'/>
</p>

<div align='center'>
  <img src='https://img.shields.io/badge/React-v17.0.2-blue?style=flat-square&logo=React'/>
  <img src="https://img.shields.io/badge/TypeScript-4.5.5-3178C6?style=flat-square&logo=TypeScript&logoColor=#3178C6" alt="TypeScript badge" />
  <img src="https://img.shields.io/badge/ReactRouter-v6.2.1-CA4245?style=flat-square&logo=React Router&logoColor=#CA4245" alt="react-router badge" />
  <img src="https://img.shields.io/badge/React Query-3.34.16-red?style=flat-square&logo=React Query&logoColor=red" />
  <img src="https://img.shields.io/badge/StyledComponents-5.3.3-DB7093?style=flat-square&logo=styled-components&logoColor=#DB7093" alt="styled-components badge" />
  <img src="https://img.shields.io/badge/Framer-6.2.7-DB7093?style=flat-square&logo=Framer&logoColor=#0055FF" alt="Framer badge" />
  <br />
  <img src="https://img.shields.io/badge/-React--hook--form--7.27.1-purple?style=flat-square&" />
  <img src="https://img.shields.io/badge/-React--player--2.9.0-purple?style=flat-square&" />
  <img src="https://img.shields.io/badge/-React--helmet--6.1.0-purple?style=flat-square&" />
  <img src="https://img.shields.io/badge/-Recoil--0.6.1-purple?style=flat-square&"/>
  <br />
  <br />                                                                              
  <a href='https://gyulsbox.github.io/GYULFLIX/'> -->🏠<--</a>                                                                             
</div>

# Description                                                                                
> 22.02.22 ~ 22.03.02

평소 영화를 사랑하는 편이어서 Netflix와 비슷한 형태의 프론트를 React 및 TypeScript를 활용하여 제작하게 되었습니다.

## Overview

### Main
<img src='https://user-images.githubusercontent.com/85726838/156602223-c39437b2-e3aa-4114-8503-17580bc39511.gif'/>
Main은 기존 넷플릭스와 같은 형태로 만들었습니다.
  <br />
  <br />   
  <br />
  <br />   
  
### Movie
<img src='https://user-images.githubusercontent.com/85726838/156602236-956295d0-343a-4773-89ab-b5e7b3827aeb.gif' />
  Movie는 The Movie Database (TMDB)의 API를 fetching 하여 메인에는 첫번쨰 Trending 영화의 트레일러를 받아와 React-Player로 재생합니다.
  로고와 영화설명 그리고 하단 영화의 나열은 Framer-motion을 사용하여 Animation을 주었습니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Movie Detail
<img src='https://user-images.githubusercontent.com/85726838/156602252-233ac6ed-7ee3-489c-93d9-a38e4c32fc51.gif' />
  하단의 영화를 클릭하면 클릭된 영화의 id값을 React-router-dom을 이용한 Nested router를 사용하여
  Modal창에 값을 넘겨주고 열리도록 설정하였습니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Tv
<img src='https://user-images.githubusercontent.com/85726838/156602264-953bbaad-b8c5-4e55-b275-14141a6f78dc.gif' />
  Tv의 구조는 Movie와 동일합니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Tv Detail
<img src='https://user-images.githubusercontent.com/85726838/156602269-439d82ad-1b0f-481a-af27-436aa080609a.gif' />
  Tv의 구조는 Movie와 동일합니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Upcoming
<img src='https://user-images.githubusercontent.com/85726838/156602276-a6967508-2f9d-40c6-925d-89613ca3b4e9.gif' />
  개봉예정의 영화를 나열해주며 선택시 ID값을 넘겨주며 Upcoming Detail에서 영화의 상세정보를 나타냅니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Search
<img src='https://user-images.githubusercontent.com/85726838/156602728-b1d0c952-7214-4f56-8611-971a84938cba.gif' />
header의 오른쪽 검색 버튼을 클릭하여 검색값 입력시 Upcoming과 같은 형태로 검색값과 일치하거나 비슷한 영화 및 드라마를 표시해줍니다.
선택시 Upcoming Detail과 같은 형태로 나타납니다.
<br />
<br />
  <br />
  <br /> 
  
## Structure  
```
└─── src
    │    App.tsx
    │    index.tsx
    │    theme.ts
    │    react-app-env.d.ts
    │    font.d.ts
    │    style.d.ts
    │
    ├─── Api
    │        api.ts
    │        utils.ts
    │
    ├─── Components
    │   ├─── Details
    │   │         MovieDetail.tsx
    │   │         TvDetail.tsx
    │   │         UpcomingDetail.tsx
    │   │
    │   ├─── Main
    │   │         Main.tsx
    │   │
    │   ├─── Movie
    │   │         Movie.tsx
    │   │
    │   ├─── Search
    │   │         Search.tsx
    │   │
    │   ├─── Tv
    │   │         Tv.tsx
    │   │
    │   └─── Upcoming
    │              Upcoming.tsx
    │
    ├─── Recoil
    │  └───   Atom.ts
    │
    ├─── Routes
    │  ├───   Header.tsx
    │  └───   Router.tsx
    │
    └─── Styles
               Back.tsx
               Error.tsx
               GlobalStyle.ts
               Loading.tsx
               NoResult.tsx
```
