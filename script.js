document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("serviceForm");
  const popup = document.getElementById("submitSuccess");

  // AJAX로 FormSubmit에 전송
  async function sendMail(data) {
    const url = "https://formsubmit.co/ajax/noteservice@outlook.kr";
    const payload = {
      ...data,
      _subject: "Lenovo 접수 요청",
      _template: "table",
      _captcha: "false"
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("메일 전송 실패");
    return res.json();
  }

  form?.addEventListener("submit", async function(e) {
    e.preventDefault();
    const data = {
      "성함":        document.getElementById('custName')?.value?.trim() || "",
      "연락처":      document.getElementById('custPhone')?.value?.trim() || "",
      "지역/주소":   document.getElementById('custArea')?.value?.trim() || "",
      "고장 증상":   document.getElementById('issueType')?.value || "",
      "상세 설명":   document.getElementById('issueDetail')?.value?.trim() || ""
    };
    try{
      await sendMail(data);
      if (popup){ popup.style.display = "block"; setTimeout(()=> popup.style.display="none", 5000); }
      form.reset();
    }catch(err){
      alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    }
  });

  // 데스크톱에서 tel: 링크 무반응
  function disableTelOnDesktop(){
    if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
        a.addEventListener('click', function(e){ e.preventDefault(); }, { passive:false });
        a.style.cursor = 'default';
      });
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', disableTelOnDesktop);
  } else {
    disableTelOnDesktop();
  }
  window.addEventListener('resize', disableTelOnDesktop);
});
