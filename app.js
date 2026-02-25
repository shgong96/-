/* ====== Utils ====== */
function pad3(n) { return String(n).padStart(3, "0"); }
function fmtKoreanDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

/* ====== Numbering (localStorage) ======
   - 일자별로 카운터를 따로 관리
   - 형식: IR-YYYYMMDD-XXX
*/
function getCounterKey(yyyymmdd) { return `ir_counter_${yyyymmdd}`; }
function nextRequestNo(yyyymmdd) {
  const key = getCounterKey(yyyymmdd);
  const current = Number(localStorage.getItem(key) || "0");
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `IR-${yyyymmdd}-${pad3(next)}`;
}
function resetCounterForDay(yyyymmdd) { localStorage.removeItem(getCounterKey(yyyymmdd)); }

/* ====== Bindings ====== */
const inputs = {
  reqNo: document.getElementById("reqNo"),
  reqDate: document.getElementById("reqDate"),
  siteName: document.getElementById("siteName"),
  location: document.getElementById("location"),
  trade: document.getElementById("trade"),
  part: document.getElementById("part"),
  contractor: document.getElementById("contractor"),
  inspector: document.getElementById("inspector"),
  summary: document.getElementById("summary"),
  remarks: document.getElementById("remarks"),
};

function readState() {
  const reqDate = inputs.reqDate.value;
  return {
    reqNo: (inputs.reqNo.value || "").trim(),
    reqDate,
    reqDateFmt: fmtKoreanDate(reqDate),
    siteName: inputs.siteName.value,
    location: inputs.location.value,
    trade: inputs.trade.value,
    part: inputs.part.value,
    contractor: inputs.contractor.value,
    inspector: inputs.inspector.value,
    summary: inputs.summary.value,
    remarks: inputs.remarks.value,
  };
}

function render() {
  const state = readState();
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    el.textContent = state[key] ?? "";
  });
}

/* ====== Init ====== */
function initDefaultDate() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  inputs.reqDate.value = `${y}-${m}-${d}`;
}

function issueNewNo() {
  const dateStr = inputs.reqDate.value;
  if (!dateStr) { alert("요청일자를 먼저 선택하세요."); return; }
  const yyyymmdd = dateStr.replaceAll("-", "");
  inputs.reqNo.value = nextRequestNo(yyyymmdd);
  render();
}

function attachEvents() {
  Object.values(inputs).forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", () => {
      if (el === inputs.reqDate) issueNewNo();
      render();
    });
  });

  document.getElementById("btnNewNo").addEventListener("click", issueNewNo);
  document.getElementById("btnResetCounter").addEventListener("click", () => {
    const dateStr = inputs.reqDate.value;
    if (!dateStr) return;
    const yyyymmdd = dateStr.replaceAll("-", "");
    const ok = confirm(`${yyyymmdd} 날짜의 일련번호를 1부터 다시 시작할까요?`);
    if (!ok) return;
    resetCounterForDay(yyyymmdd);
    issueNewNo();
  });
  document.getElementById("btnPrint").addEventListener("click", () => window.print());
}

(function main() {
  initDefaultDate();
  attachEvents();
  issueNewNo();
  render();
})();
