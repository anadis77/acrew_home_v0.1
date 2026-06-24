import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs/acrew-inquiry-template";
const workbook = Workbook.create();

const inquiry = workbook.worksheets.add("문의");
const status = workbook.worksheets.add("상태값");
const guide = workbook.worksheets.add("사용안내");

const headers = [
  "접수일시",
  "이름",
  "연락처",
  "이메일",
  "관심영역",
  "현재고민",
  "유입페이지",
  "처리상태",
  "메모"
];

const sampleRows = [
  [
    new Date("2026-07-01T10:00:00+09:00"),
    "홍길동",
    "010-0000-0000",
    "hello@example.com",
    "AI 실무 교육 / 강의",
    "반복 보고서와 콘텐츠 초안 작업을 줄이고 싶습니다.",
    "A·CREW Korean Homepage",
    "신규",
    "샘플 행입니다. 실제 운영 전 삭제해도 됩니다."
  ],
  [
    new Date("2026-07-01T14:30:00+09:00"),
    "김아테나",
    "010-1111-2222",
    "athena@example.com",
    "맞춤형 AI 에이전트 구축",
    "운영, 마케팅, 개발 업무 흐름에 들어가는 에이전트 구성이 필요합니다.",
    "A·CREW Korean Homepage",
    "검토중",
    "상담 일정 확인 필요"
  ]
];

inquiry.getRange("A1:I1").values = [headers];
inquiry.getRange("A2:I3").values = sampleRows;
inquiry.freezePanes.freezeRows(1);
inquiry.showGridLines = false;

inquiry.getRange("A1:I1").format = {
  fill: { color: "#111111" },
  font: { color: "#D6B94C", bold: true },
  wrapText: true,
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "bottom", style: "thin", color: "#D6B94C" }
};
inquiry.getRange("A2:I80").format = {
  fill: { color: "#FAFAF8" },
  font: { color: "#222222" },
  wrapText: true,
  verticalAlignment: "top",
  borders: { insideHorizontal: { style: "thin", color: "#E8E2D0" } }
};
inquiry.getRange("A:A").format.columnWidthPx = 140;
inquiry.getRange("B:B").format.columnWidthPx = 90;
inquiry.getRange("C:C").format.columnWidthPx = 130;
inquiry.getRange("D:D").format.columnWidthPx = 190;
inquiry.getRange("E:E").format.columnWidthPx = 180;
inquiry.getRange("F:F").format.columnWidthPx = 360;
inquiry.getRange("G:G").format.columnWidthPx = 190;
inquiry.getRange("H:H").format.columnWidthPx = 100;
inquiry.getRange("I:I").format.columnWidthPx = 260;
inquiry.getRange("A2:A80").setNumberFormat("yyyy-mm-dd hh:mm");
inquiry.getRange("H2:H200").dataValidation = {
  rule: { type: "list", formula1: "='상태값'!$A$2:$A$7" }
};

status.showGridLines = false;
status.getRange("A1:B1").values = [["처리상태", "설명"]];
status.getRange("A2:B7").values = [
  ["신규", "문의가 막 접수된 상태"],
  ["검토중", "내용을 확인하고 응대 방향을 정리하는 상태"],
  ["답변완료", "문의자에게 1차 안내를 보낸 상태"],
  ["상담예정", "상담 일정이 잡힌 상태"],
  ["진행중", "교육, 구축, 컨설팅 논의가 진행 중인 상태"],
  ["종료", "후속 액션이 완료되었거나 더 진행하지 않는 상태"]
];
status.getRange("A1:B1").format = {
  fill: { color: "#111111" },
  font: { color: "#D6B94C", bold: true },
  horizontalAlignment: "center",
  borders: { preset: "bottom", style: "thin", color: "#D6B94C" }
};
status.getRange("A2:B7").format = {
  fill: { color: "#FAFAF8" },
  font: { color: "#222222" },
  wrapText: true,
  borders: { insideHorizontal: { style: "thin", color: "#E8E2D0" } }
};
status.getRange("A:A").format.columnWidthPx = 120;
status.getRange("B:B").format.columnWidthPx = 320;

guide.showGridLines = false;
guide.getRange("A1:D1").merge();
guide.getRange("A1:D1").values = [["A·CREW 문의 DB 템플릿"]];
guide.getRange("A3:D8").values = [
  ["1", "이 파일을 구글 드라이브에 업로드한 뒤 Google Sheets로 열어 사용합니다.", "", ""],
  ["2", "Apps Script를 이 스프레드시트에 붙이고 웹 앱으로 배포합니다.", "", ""],
  ["3", "홈페이지의 CONTACT_ENDPOINT에 웹 앱 배포 URL을 넣습니다.", "", ""],
  ["4", "홈페이지 문의가 들어오면 '문의' 시트에 자동으로 한 줄씩 쌓입니다.", "", ""],
  ["5", "처리상태는 드롭다운으로 관리하고, 내부 메모는 '메모' 열에 적습니다.", "", ""],
  ["6", "샘플 행은 실제 운영 전 삭제해도 됩니다.", "", ""]
];
guide.getRange("A10:D10").merge();
guide.getRange("A10:D10").values = [["내부 알림 이메일: your-email@example.com"]];
guide.getRange("A1:D1").format = {
  fill: { color: "#111111" },
  font: { color: "#D6B94C", bold: true, size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};
guide.getRange("A3:D10").format = {
  fill: { color: "#FAFAF8" },
  font: { color: "#222222" },
  wrapText: true,
  verticalAlignment: "top",
  borders: { insideHorizontal: { style: "thin", color: "#E8E2D0" } }
};
guide.getRange("A:A").format.columnWidthPx = 44;
guide.getRange("B:D").format.columnWidthPx = 280;

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({ sheetName: "문의", range: "A1:I12", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/preview.png`, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/A_CREW_Inquiry_DB_Template.xlsx`);
