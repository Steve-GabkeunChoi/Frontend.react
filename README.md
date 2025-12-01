# Frontend.react - 게시판 프론트엔드 (React + Vite + Tailwind)

로컬 스토리지 기반으로 동작하는 학습/데모용 게시판 애플리케이션입니다. 인증(회원가입/로그인), 글 CRUD, 검색, 페이지네이션, 조회수 집계, 수정/삭제, 기본 보안(비밀번호 해싱) 등을 포함합니다. 백엔드 없이 브라우저에서 모든 상태를 관리하므로 빠르게 UI/상태 관리 패턴을 학습할 수 있습니다.

## 기술 스택
- React 18
- Vite 5 (번들링/개발 서버)
- React Router v6
- Tailwind CSS 3

## 폴더 구조 & 역할
```
src/
  App.jsx
  main.jsx
  styles/index.css
  context/PostsContext.jsx        # 게시글 목록/CRUD/조회수 상태
  context/AuthContext.jsx         # 사용자 세션/회원가입/로그인/로그아웃
  services/postsService.js
  components/
    Layout.jsx                    # 공통 레이아웃/헤더/푸터/네비게이션
    PostForm.jsx                  # 글 작성 및 수정 폼
    PostItem.jsx                  # 단일 글 카드
    PostList.jsx                  # 목록 + 페이지 계산
    Pagination.jsx                # 페이지네이션 UI
    SearchBar.jsx                 # 검색 입력 폼
    ProtectedRoute.jsx            # 인증 필요 라우트 가드
  pages/
    BoardPage.jsx                 # 글 작성 + 목록 + 검색/페이징
    PostDetailPage.jsx            # 글 상세/조회수 증가/수정/삭제
    LoginPage.jsx                 # 로그인
    RegisterPage.jsx              # 회원가입
```

## 설치 & 실행
### 1. 의존성 설치
아래 명령을 프로젝트 루트(`package.json`이 있는 위치)에서 실행:
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저가 자동으로 열리지 않으면 http://localhost:5173 접속.

### 3. 프로덕션 빌드
```bash
npm run build
```
`dist/` 폴더가 생성됩니다.

### 4. 로컬 프리뷰(빌드 결과 확인)
```bash
npm run preview
```

## 기능 개요
### 게시판
- 작성: 제목/내용/작성자(로그인 사용자 표시명 기본값) 등록
- 목록: 최신순 정렬, 제목/내용 포함 검색, 페이지네이션(기본 5개/페이지)
- 상세: 조회수 자동 증가, 수정/삭제 제공
- 수정: 내용/제목 변경 후 업데이트 타임스탬프 반영
- 삭제: 확인 다이얼로그 후 목록 이동
- 저장소: 브라우저 `localStorage` (단순 JSON 배열)

### 인증
- 회원가입: 아이디/표시 이름/이메일(선택)/비밀번호 + 최소 길이 & 이메일 형식 검증
- 로그인/로그아웃: 세션은 `localStorage`에 직렬화 저장
- 비밀번호 보안: Web Crypto API(SHA-256) 해시 저장(`passwordHash`) -> 원문 비밀번호 미저장
- 라우트 보호: 게시판 페이지(`/board`)는 로그인 필요 (ProtectedRoute)

### UI/UX
- 반응형 기본 (Tailwind 유틸리티)
- 폼 로딩 상태 & 에러 메시지 표시
- 헤더에 인증 상태 따라 로그인/회원가입 또는 사용자명/로그아웃 노출

### 상태 관리 전략
- Context API (AuthContext, PostsContext)로 전역 공유
- 로컬 스토리지 → 초기 로드 후 메모리 상태 관리 → 변경 즉시 동기화
- 게시글 목록은 메모리에서 필터/페이지네이션 계산 (서버 부하 없음)

## Tailwind 커스터마이징
- 구성: `tailwind.config.js` → content 경로 및 색상(`primary`, `accent`) 확장
- 공통 버튼 스타일: `src/styles/index.css`에서 커스텀 유틸(`.btn-primary`, `.btn-secondary`) 정의
- 확장 아이디어: 폼 상태(loading, error)에 따른 variant 추가, 다크 모드(`media` 또는 `class`) 토글

## 아키텍처 개요
| 레이어 | 책임 | 구현 |
| ------ | ---- | ---- |
| View/UI | Tailwind 기반 컴포넌트 | components/* |
| Page | 화면 단위 조합/데이터 요청 | pages/* |
| State | 인증/게시글 전역 상태 | context/* |
| Service | 로컬 스토리지 CRUD 추상화 | services/postsService.js |

장점: 단순/명확한 분리, API 연동 시 service 레이어만 교체 가능. 
추가 개선: React Query 도입 / Error Boundary / Suspense 기반 로딩 개선.

## 개발 스크립트
| 스크립트 | 목적 |
| -------- | ---- |
| `npm run dev` | Vite 개발 서버 (HMR) |
| `npm run build` | 프로덕션 번들 생성 (`dist/`) |
| `npm run preview` | 빌드 결과 로컬 프리뷰 |

## 환경 변수 확장 (예시)
향후 백엔드 연동 시:
```
VITE_API_BASE_URL=https://api.example.com
```
`import.meta.env.VITE_API_BASE_URL` 사용.

## 배포 가이드 (Vercel 예시)
1. GitHub 연결 후 `Import Project`
2. Framework: Vite 자동 인식
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. 환경 변수 설정 필요 시 Vercel Dashboard → Settings → Environment Variables
6. Deploy 후 제공된 도메인 확인

Netlify: Build `npm run build` / Publish `dist` / Redirects 필요 시 `_redirects` 파일 추가

## 테스트 확장 제안
- 도구: Vitest + React Testing Library
- 예: PostForm 렌더 & 제출, AuthContext 로그인 로직, 검색 필터링
- 설치: `npm i -D vitest @testing-library/react @testing-library/jest-dom`

## 성능/확장 고려
- 현재 전체 목록을 메모리 필터링 → 데이터 증가 시 서버 페이징/Infinite Scroll 고려
- 해싱은 SHA-256 단순 사용 → 실서비스는 서버 단에서 bcrypt/scrypt 권장
- localStorage Race Condition 거의 없음(단일 탭 기준) → multi-tab 동기화는 `storage` 이벤트 처리 가능

## 백엔드 전환 시 변경 포인트
| 영역 | 현재 | 변경 후 |
| ---- | ---- | ---- |
| 인증 | localStorage + 해시 | JWT/OAuth 세션 + 서버 검증 |
| 데이터 | postsService 로컬 JSON | REST/GraphQL fetch + 캐싱 |
| 조회수 | 클라이언트 증가 | 서버 측 카운터(동시성 제어) |
| 보안 | 프론트 단 해시 | 전송 HTTPS + 서버 해시 + Rate limit |

## 추가 작업 아이디어
- 프로필 페이지(표시 이름/이메일 수정)
- 비밀번호 변경/재설정(임시 토큰)
- 다국어(i18n) 적용
- 에디터(마크다운 미리보기 / 이미지 업로드)
- 접근성(A11y) 점검: 키보드 포커스 링, ARIA 라벨

## 문제 해결
- 새로 고침 후 로그인 풀림: localStorage 삭제 여부 확인
- 빠른 글 작성 후 목록 안 보임: 게시글 정렬은 createdAt 기준 → 시계 문제(시스템 시간 변경) 확인
- 스타일 미적용: `index.css` import 누락 여부/캐시 비우기

## 보안 참고
- Demo 수준 해싱: 실제 서비스는 서버에서 솔트+해시
- XSS 방지: 현재 입력 내용 그대로 출력 → 실서비스 시 sanitize 필요 (DOMPurify 등)
- CSRF: 현재 서버 없음 → API 도입 시 CSRF 토큰 또는 SameSite 쿠키 설정 고려

## GitHub 업로드 절차
원격 저장소: https://github.com/Steve-GabkeunChoi/Frontend.react.git

1. Git 초기화 (이미 되어 있다면 생략)
```bash
git init
```
2. 기본 브랜치명을 main으로 설정 (필요 시)
```bash
git branch -M main
```
3. 변경 사항 스테이징 및 커밋
```bash
git add .
git commit -m "feat: 초기 게시판 프론트엔드 설정"
```
4. 원격 추가
```bash
git remote add origin https://github.com/Steve-GabkeunChoi/Frontend.react.git
```
5. 푸시
```bash
git push -u origin main
```

(이미 `origin`이 존재한다면 `git remote set-url origin ...`으로 변경 가능)

## 이후 확장 아이디어 (요약)
- 백엔드 API 연동 / 권한(Role) 기반 접근 제어
- 고급 에디터(이미지/마크다운) & 파일 업로드
- 다크 모드 / 사용자 설정 저장
- 실시간 기능(WebSocket, SSE)로 조회수/댓글 반영
- Vitest + E2E(Playwright) 자동화 테스트

## 간단 문제 해결 (FAQ)
- 글 저장 안 됨: 브라우저 `localStorage` 허용 여부 / 시크릿 모드 확인
- 페이지 안 뜸: 개발 서버 포트 충돌 시 Vite가 자동 변경 → 터미널 로그에서 포트 확인
- 로그인 실패: 아이디/비밀번호 최소 길이 / 케이스(대소문자) 확인
- 스타일 이상: Tailwind JIT는 content 경로 기반 → 신규 파일 경로 누락 여부 확인

## 라이선스
데모 용도. 필요 시 프로젝트 요구사항에 맞게 수정하세요.
