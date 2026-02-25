# 검측요청서 생성기 (GitHub Pages)

브라우저에서 검측요청서를 입력하고 PDF로 저장하는 정적 웹앱입니다.

## 기능
- 검측요청서 번호 자동 생성: `IR-YYYYMMDD-XXX`
  - 날짜별 일련번호가 자동 증가 (브라우저 localStorage에 저장)
- 요청일자 선택
- 위치/공종/검측부위/담당자 등 자유 입력
- PDF 저장: 상단 버튼 → 브라우저 인쇄 기능으로 "PDF로 저장"

## 가장 쉬운 배포(권장) — GitHub Pages
1) 이 프로젝트 파일을 저장소 루트에 업로드/커밋
2) Repository → **Settings → Pages**
3) Source: **Deploy from a branch**
4) Branch: **main** / Folder: **/(root)** → Save
5) 표시되는 URL로 접속

> URL 형식: `https://<깃허브아이디>.github.io/<저장소이름>/`

## 참고
- GitHub는 보안상 이유로 “업로드만 하면 자동으로 Pages가 켜지는 것”은 기본 제공되지 않습니다.
  (최초 1회 Pages 설정에서 브랜치만 선택해주면, 이후부터는 커밋만 하면 자동 반영됩니다.)
