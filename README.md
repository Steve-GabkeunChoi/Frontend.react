# Frontend.react - 게시판 프론트엔드 (React + Vite + Tailwind)

로컬 스토리지를 활용한 간단한 게시판 데모 프론트엔드입니다. 글 작성/수정/삭제, 검색, 페이징, 상세 보기, 조회수 증가 기능을 포함합니다.

## 기술 스택
- React 18
- Vite 5 (번들링/개발 서버)
- React Router v6
- Tailwind CSS 3

## 폴더 구조
```
src/
  App.jsx
  main.jsx
  styles/index.css
  context/PostsContext.jsx
  services/postsService.js
  components/
    Layout.jsx
    PostForm.jsx
    PostItem.jsx
    PostList.jsx
    Pagination.jsx
    SearchBar.jsx
  pages/
    BoardPage.jsx
    PostDetailPage.jsx
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
- 글 작성: 제목, 내용, 작성자(선택) 입력 후 등록
- 글 목록: 최신순 정렬, 검색(제목/내용 포함), 페이지네이션(5개/페이지)
- 글 상세: 조회수 증가, 수정/삭제 가능
- 수정: 제목/내용 변경 후 저장
- 삭제: 확인 후 목록으로 이동
- 데이터 저장: 브라우저 `localStorage`

## Tailwind 커스터마이징
`tailwind.config.js`에서 색상 확장(`primary`, `accent`).
사용자 정의 버튼 유틸은 `src/styles/index.css`에 정의.

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

## 이후 확장 아이디어
- 백엔드 API 연동 (현재는 localStorage 기반)
- 인증/권한 (작성자별 권한 관리)
- 이미지 업로드 또는 에디터(Toast UI 등) 적용
- 다크 모드 토글
- 테스트 코드 (Vitest/React Testing Library)

## 문제 해결
- 글이 안 저장되는 경우: 브라우저 `localStorage` 비활성화 여부 확인
- 새 기능 추가 시: 컴포넌트는 `src/components`, 페이지는 `src/pages`에 배치

## 라이선스
데모 용도. 필요 시 프로젝트 요구사항에 맞게 수정하세요.
