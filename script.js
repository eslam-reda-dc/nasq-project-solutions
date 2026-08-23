const primaryEmail = "eslamreda.mrz@gmail.com";
const architecturalEmail = "Sheriffshawky94@gmail.com";
const structuralEmail = "Eng.sabbahy@gmail.com";
const formEndpoint = "https://formspree.io/f/mbgrybvl";

let arabic = false;
let selectedService = "";
let selectedActivity = "";
let selectedPlan = "Professional";
const nasqQuery = new URLSearchParams(window.location.search);
if (["Document Control", "Technical Office", "Document Control & Technical Office"].includes(nasqQuery.get("service"))) selectedService = nasqQuery.get("service");

const t = (en, ar) => arabic ? ar : en;
const activitySubject = {
  "Document Control": "شغل مستندات",
  Architectural: "معماري",
  Structural: "إنشائي",
  Electrical: "كهرباء",
  Mechanical: "ميكانيكا",
  Surveying: "مساحة"
};

const dc = [
  ["Project System Setup","تأسيس نظام المشروع","Coding, registers, procedures, workflows, templates and folder structure.","التكويد والسجلات والإجراءات ودورات العمل والنماذج وهيكل المجلدات"],
  ["Managed Monthly Support","متابعة شهرية مُدارة","Submission checks, live logs, pending and overdue monitoring, weekly reporting.","مراجعة التقديمات وتحديث السجلات ومتابعة المعلق والمتأخر والتقارير الأسبوعية"],
  ["Backlog Recovery","معالجة التراكمات","Audit accumulated files, rebuild logs, identify gaps and issue a recovery report.","مراجعة الملفات المتراكمة وإعادة بناء السجلات وتحديد النواقص وإصدار تقرير بالحالة"],
  ["Closeout & Handover","التسليم النهائي والأرشفة","As-built index, approvals, records, O&M document structure and missing-item report.","فهرس اللوحات النهائية والاعتمادات والسجلات وهيكل ملفات التشغيل والصيانة وتقرير النواقص"]
];

const technical = [
  ["Architectural Shop Drawings","لوحات تنفيذية معمارية","Plans, elevations, sections, details, finishes, stairs, ramps and schedules.","المساقط والواجهات والقطاعات والتفاصيل والتشطيبات والسلالم والرامبات والجداول","Architectural"],
  ["Structural Shop Drawings","لوحات تنفيذية إنشائية","Concrete dimensions, reinforcement plans, sections and construction details.","الأبعاد الخرسانية ومخططات التسليح والقطاعات والتفاصيل التنفيذية","Structural"],
  ["Review & Coordination","المراجعة والتنسيق","Design-document review, architectural/structural coordination and RFI preparation.","مراجعة مستندات التصميم والتنسيق المعماري والإنشائي وتجهيز الاستفسارات الفنية",""],
  ["Comments & As-Built","الملاحظات وAs-Built","Consultant-comment incorporation, revision updates and final as-built packages.","دمج ملاحظات الاستشاري وتحديث الإصدارات وتجهيز حزم لوحات ما تم تنفيذه",""],
  ["Quantity Surveying (QS)","حصر الكميات (QS)","Accurate quantity takeoffs from approved drawings, organized by discipline, zone and work package.","حصر دقيق للكميات من اللوحات المعتمدة وتنظيمها حسب التخصص والمنطقة وحزمة الأعمال",""],
  ["BOQ Preparation","إعداد جداول الكميات (BOQ)","Structured bills of quantities with item descriptions, units, measured quantities and clear scope breakdown.","إعداد جداول كميات منظمة تشمل وصف البنود والوحدات والكميات وتقسيم نطاق العمل بوضوح",""],
  ["Interior Design","التصميم الداخلي","Space planning, interior concepts, material and finish selection, presentation drawings and coordinated details.","تخطيط الفراغات والتصورات الداخلية واختيار الخامات والتشطيبات ولوحات العرض والتفاصيل المنسقة","Architectural"]
];

const capabilities = ["Document Control Manager — 20+ years","Document Control Team Leaders","Senior Document Controllers","Architectural Technical Office Engineers","Structural Technical Office Engineers","CAD, Excel & Power BI Support"];

const cases = [
  ["Residential & Commercial Developments","مشروعات سكنية وتجارية","Owner-side systems, multi-party workflows, logs, reporting and digital archives.","أنظمة من جانب المالك ودورات متعددة الأطراف والسجلات والتقارير والأرشيف الإلكتروني"],
  ["Banking & Administrative Projects","مشروعات بنكية وإدارية","Contractor-side submittals, Aconex workflows, dashboards and technical records.","تقديمات من جانب المقاول ودورات Aconex ولوحات البيانات والسجلات الفنية"],
  ["Foundation & Structural Packages","حزم الأساسات والأعمال الإنشائية","Structural drawing preparation, reinforcement details, revisions and submission control.","إعداد اللوحات الإنشائية وتفاصيل التسليح والإصدارات وضبط التقديمات"]
];

const plans = [
  {name:"Essential",ar:"الأساسية",tag:"Defined task",tagAr:"مهمة محددة",features:[["Defined scope and delivery schedule","نطاق وموعد تسليم محددان"],["Internal quality review","مراجعة جودة داخلية"],["Organized final delivery link","رابط تسليم نهائي منظم"],["One consolidated revision round","جولة تعديلات مجمعة واحدة"],["30-day file retention","الاحتفاظ بالملفات لمدة 30 يومًا"]]},
  {name:"Professional",ar:"الاحترافية",tag:"Ongoing project",tagAr:"مشروع مستمر",featured:true,features:[["Dedicated cloud workspace per client","مساحة سحابية مخصصة لكل عميل"],["Folder structure and revision control","هيكل ملفات وضبط كامل للإصدارات"],["Live deliverable register","سجل متابعة محدث للمخرجات"],["Weekly progress report","تقرير أسبوعي بنسبة الإنجاز"],["Scheduled backup and priority support","نسخ احتياطي ودعم بأولوية"],["Cloud access through project delivery","إتاحة المساحة طوال فترة تنفيذ المشروع"]]},
  {name:"Project Partner",ar:"شريك المشروع",tag:"Managed delivery",tagAr:"إدارة متكاملة",features:[["Architectural, structural and DC coordination","تنسيق المعماري والإنشائي وإدارة المستندات"],["Prepare, review, code, track and archive","إعداد ومراجعة وتكويد ومتابعة وأرشفة"],["Dedicated cloud workspace and dashboard","مساحة سحابية ولوحة متابعة للمشروع"],["Two-stage quality gate","مراجعة جودة على مرحلتين"],["Periodic coordination meeting and reports","اجتماع متابعة وتقارير دورية"],["Priority response, NDA and closeout package","أولوية استجابة وسرية وحزمة تسليم نهائية"],["Six-month post-handover file retention","الاحتفاظ بالملفات 6 أشهر بعد التسليم"]]}
];

function serviceCards(items, prefix, technicalOffice = false) {
  return items.map((x, i) => `<article class="service-card"><span>${prefix}·${String(i + 1).padStart(2,"0")}</span><h3>${t(x[0],x[1])}</h3><p>${t(x[2],x[3])}</p><a href="#contact" data-service="${technicalOffice ? "Technical Office" : "Document Control"}" data-activity="${technicalOffice ? x[4] : ""}">${t("Request this service","اطلب الخدمة")} →</a></article>`).join("");
}

function render() {
  document.documentElement.lang = arabic ? "ar" : "en";
  document.documentElement.dir = arabic ? "rtl" : "ltr";
  document.getElementById("app").innerHTML = `
  <main dir="${arabic ? "rtl" : "ltr"}">
    <header class="nav shell"><a class="brand" href="#top"><span>N</span><b>NASQ <small>Project Solutions</small></b></a><nav><a href="#service-lines">${t("Services","الخدمات")}</a><a href="#integrated">${t("Integrated","المتكاملة")}</a><a href="#plans">${t("Packages","الباقات")}</a><a href="#team">${t("Team","الفريق")}</a><a href="#founder">${t("Founder","المؤسس")}</a><a href="#projects">${t("Experience","الخبرات")}</a><a href="insights/">${t("Knowledge","المعرفة")}</a><a href="#contact">${t("Request a Quote","عرض سعر")}</a></nav><button class="lang" id="langButton">${arabic ? "EN" : "عربي"}</button></header>

    <section id="top" class="hero shell"><div><p class="eyebrow">${t("DOCUMENTATION · DRAWINGS · PROJECT SUPPORT","المستندات · اللوحات · دعم المشروعات")}</p><h1>${t("Two specialist services. One accountable project partner.","خدمتان متخصصتان وشريك واحد مسؤول أمامك")}</h1><p class="lead">${t("NASQ provides independent Document Control and Technical Office services through a flexible team of senior specialists. Choose either service separately—or combine both when your project needs a fully controlled drawing cycle.","تقدم نَسَق خدمات مستقلة في إدارة المستندات والمكتب الفني من خلال فريق مرن من المتخصصين أصحاب الخبرة ويمكنك اختيار أي خدمة منفردة أو الجمع بينهما لإدارة دورة اللوحات بالكامل")}</p><div class="actions"><a class="primary" href="#service-lines">${t("Explore services","استكشف الخدمات")}</a><a class="secondary" href="#contact">${t("Request a scope review","اطلب مراجعة نطاق العمل")}</a></div><div class="quick-tools"><a href="tools/document-control-health-check/">${t("Free project assessment","تقييم مجاني للمشروع")} ↗</a><a href="tools/scope-estimator/">${t("Estimate your service scope","حدد نطاق خدمتك")} ↗</a></div><div class="trust"><span>${t("Senior team expertise exceeding 20 years","خبرات قيادية للفريق تتجاوز 20 عامًا")}</span><span>${t("Remote project support","تنفيذ ودعم المشروعات عن بُعد")}</span><span>${t("NDA available","اتفاقية سرية متاحة")}</span></div></div><aside class="status-card"><p>${t("CHOOSE YOUR SERVICE","اختر خدمتك")}</p><a href="#document-control"><b>01</b><span>Document Control<small>${t("Independent managed service","خدمة مُدارة مستقلة")}</small></span></a><a href="#technical-office"><b>02</b><span>Technical Office<small>${t("Architectural & structural","معماري وإنشائي")}</small></span></a><a href="#integrated"><b>03</b><span>Integrated Package<small>${t("Optional combined delivery","عرض متكامل اختياري")}</small></span></a></aside></section>

    <section class="audience"><div class="shell"><b>${t("BUILT FOR","نخدم")}</b><div>${[["Main Contractors","المقاولين الرئيسيين"],["Consultants","الاستشاريين"],["Developers","المطورين"],["Subcontractors","مقاولي الباطن"],["Overloaded Technical Offices","المكاتب الفنية تحت ضغط"]].map(x=>`<span>${t(x[0],x[1])}</span>`).join("")}</div></div></section>

    <section id="service-lines" class="section shell"><p class="eyebrow">${t("TWO INDEPENDENT SERVICE LINES","خطا خدمات مستقلان")}</p><h2>${t("Buy exactly the support your project needs","اطلب الخدمة التي يحتاجها مشروعك فقط")}</h2><div class="pillars"><article><span>01</span><h3>NASQ Document Control</h3><p>${t("For clients who need project information organized, tracked, reported and handed over—regardless of who prepares the drawings.","للعملاء الذين يحتاجون تنظيم معلومات المشروع ومتابعتها وإعداد تقاريرها وتسليمها بغض النظر عن الجهة التي تعد اللوحات")}</p><a href="services/document-control/">${t("Explore Document Control service","استكشف خدمة إدارة المستندات")} →</a><a class="pillar-secondary" href="#document-control">${t("View service details","عرض تفاصيل الخدمة")} →</a></article><article><span>02</span><h3>NASQ Technical Office</h3><p>${t("For clients who need architectural or structural shop drawings, coordination, revisions or as-built packages—regardless of who controls the documents.","للعملاء الذين يحتاجون لوحات تنفيذية معمارية أو إنشائية أو تنسيقًا ومراجعات أو لوحات ما تم تنفيذه بغض النظر عن الجهة التي تدير المستندات")}</p><a href="services/technical-office/">${t("Explore Technical Office service","استكشف خدمة المكتب الفني")} →</a><a class="pillar-secondary" href="#technical-office">${t("View service details","عرض تفاصيل الخدمة")} →</a></article></div></section>

    <section id="document-control" class="section alt"><div class="shell"><p class="eyebrow">01 · NASQ DOCUMENT CONTROL</p><h2>${t("Controlled information from project start to handover","معلومات منضبطة من بداية المشروع حتى التسليم")}</h2><div class="grid four">${serviceCards(dc,"DC")}</div></div></section>

    <section id="technical-office" class="section shell"><p class="eyebrow">02 · NASQ TECHNICAL OFFICE</p><h2>${t("Drawings, quantities and coordinated design support","اللوحات والكميات ودعم التصميم المنسق")}</h2><div class="grid four">${serviceCards(technical,"TO",true)}</div><div class="scope-note"><b>${t("Scope clarity","وضوح النطاق")}</b><p>${t("Shop drawings are prepared and developed based on approved design documents and project specifications. New engineering design and calculations require a separate agreed scope and qualified design responsibility.","يتم إعداد وتطوير اللوحات التنفيذية بناء على مستندات التصميم المعتمدة ومواصفات المشروع أما التصميمات والحسابات الهندسية الجديدة فتتطلب نطاقًا منفصلًا ومسؤولية تصميم مؤهلة")}</p></div></section>

    <section id="integrated" class="integrated"><div class="shell"><div><p class="eyebrow">03 · ${t("OPTIONAL INTEGRATED PACKAGE","العرض المتكامل الاختياري")}</p><h2>${t("From drawing preparation to approval-ready archive","من إعداد اللوحة إلى أرشيف منظم وجاهز للاعتماد")}</h2><p>${t("One coordinated team can prepare, review, code, submit, revise, track and archive your shop drawings. Each service remains available separately.","يمكن لفريق واحد إعداد اللوحات ومراجعتها وتكويدها وتقديمها وتعديلها ومتابعتها وأرشفتها مع بقاء كل خدمة متاحة بصورة مستقلة")}</p><a class="primary" href="#contact" data-service="Document Control & Technical Office">${t("Request integrated support","اطلب الدعم المتكامل")}</a></div><div class="cycle">${[["01","Review Inputs","مراجعة المدخلات"],["02","Prepare Drawings","إعداد اللوحات"],["03","Internal QA","المراجعة الداخلية"],["04","Code & Submit","التكويد والتقديم"],["05","Track Comments","متابعة الملاحظات"],["06","Revise & Archive","التعديل والأرشفة"]].map(x=>`<div><b>${x[0]}</b><span>${t(x[1],x[2])}</span></div>`).join("")}</div></div></section>

    <section id="plans" class="section shell"><p class="eyebrow">${t("SERVICE PACKAGES","باقات الخدمة")}</p><h2>${t("Choose the management level your project needs","اختر مستوى الإدارة المناسب لمشروعك")}</h2><p class="plans-intro">${t("Package selection defines the management, reporting, storage and support level. Final pricing is issued after reviewing the actual scope and schedule.","اختيار الباقة يحدد مستوى الإدارة والتقارير والتخزين والدعم ويتم تحديد السعر النهائي بعد مراجعة نطاق العمل والمدة المطلوبة")}</p><div class="plans">${plans.map(p=>`<article class="${p.featured ? "plan featured" : "plan"}">${p.featured ? `<span class="recommended">${t("MOST POPULAR","الأكثر طلبًا")}</span>` : ""}<p>${t(p.tag,p.tagAr)}</p><h3>${t(p.name,p.ar)}</h3><ul>${p.features.map(f=>`<li>✓ ${t(f[0],f[1])}</li>`).join("")}</ul><a class="${p.featured ? "primary" : "secondary"}" href="#contact" data-plan="${p.name}">${t("Choose package","اختر الباقة")}</a></article>`).join("")}</div><div class="cloud-value"><b>${t("Premium cloud workspace","مساحة سحابية مميزة لكل عميل")}</b><p>${t("Professional and Project Partner clients receive a dedicated, structured cloud workspace with controlled folders, current revisions, progress records and secure delivery links—so the project stays organized and recoverable instead of depending on scattered messages and personal devices.","يحصل عملاء الباقة الاحترافية وباقة شريك المشروع على مساحة سحابية مخصصة ومنظمة تشمل مجلدات منضبطة وأحدث الإصدارات وسجلات المتابعة وروابط تسليم آمنة ليظل المشروع منظمًا وقابلًا للاسترجاع بدلًا من الاعتماد على الرسائل المتفرقة والأجهزة الشخصية")}</p></div></section>

    <section class="section shell"><p class="eyebrow">${t("SPECIALIZED PROJECT SUPPORT","حلول إضافية للمشروعات")}</p><h2>${t("Short, focused packages that solve urgent project problems","باقات مركزة تعالج مشكلات المشروع العاجلة")}</h2><div class="grid solutions">${[["Project Mobilization","تجهيز بداية المشروع","Procedures, matrices, schedules, templates, workflows and team orientation.","الإجراءات والمصفوفات والجداول والنماذج ودورات العمل وتعريف الفريق بالنظام"],["Technical Office Overflow","دعم المكتب الفني وقت الضغط","Temporary drawing-production capacity for deadlines and submission peaks.","طاقة إنتاج مؤقتة لإعداد اللوحات خلال المواعيد الضاغطة وفترات كثافة التقديمات"],["Closeout Rescue","إنقاذ ملفات التسليم","Gap assessment, as-built control, approval records and handover structure.","تقييم النواقص وضبط لوحات ما تم تنفيذه وسجلات الاعتماد وهيكل التسليم"],["Paid Pilot","تجربة مدفوعة","A small defined package to test quality, communication and delivery before a larger engagement.","حزمة صغيرة محددة لاختبار الجودة والتواصل والتسليم قبل التعاقد الأكبر"]].map(x=>`<article><h3>${t(x[0],x[1])}</h3><p>${t(x[2],x[3])}</p></article>`).join("")}</div></section>

    <section id="team" class="section alt"><div class="shell team"><div><p class="eyebrow">${t("TEAM CAPABILITY","قدرات الفريق")}</p><h2>${t("The right specialists, assigned to the right scope","المتخصص المناسب لكل نطاق عمل")}</h2><p>${t("NASQ operates as a flexible project-services team. Senior members bring individual experience extending beyond 20 years—from department management and team leadership to specialized technical-office delivery. Team composition is assigned according to the approved scope and workload.","تعمل نَسَق كفريق مرن لخدمات المشروعات ويضم أعضاؤها خبرات قيادية وفنية فردية تتجاوز 20 عامًا بداية من إدارة الأقسام وقيادة الفرق وصولًا إلى التنفيذ المتخصص لأعمال المكتب الفني ويتم تشكيل الفريق حسب نطاق العمل المعتمد وحجمه")}</p></div><ul>${capabilities.map(x=>`<li>✓ ${x}</li>`).join("")}</ul></div></section>

    <section class="section shell"><p class="eyebrow">${t("QUALITY GATE","بوابة الجودة")}</p><h2>${t("Every drawing and submission passes a defined review path","كل لوحة وتقديم يمر بمسار مراجعة محدد")}</h2><div class="qa">${[["01","Prepared","إعداد","Discipline engineer prepares the deliverable.","مهندس التخصص يعد المخرج الفني"],["02","Checked","مراجعة","Independent discipline check for coordination and completeness.","مراجعة مستقلة للتنسيق والاكتمال"],["03","Submission Check","فحص التقديم","Code, revision, title, attachments and register are verified.","فحص الكود والإصدار والعنوان والمرفقات والسجل"]].map(x=>`<div><b>${x[0]}</b><h3>${t(x[1],x[2])}</h3><p>${t(x[3],x[4])}</p></div>`).join("")}</div></section>

    <section id="projects" class="section alt"><div class="shell"><p class="eyebrow">${t("SELECTED TEAM EXPERIENCE","نماذج من خبرات الفريق")}</p><h2>${t("Relevant experience without exposing confidential project data","خبرات مرتبطة بالخدمة دون نشر بيانات المشروعات السرية")}</h2><div class="grid cases">${cases.map(x=>`<article><h3>${t(x[0],x[1])}</h3><p>${t(x[2],x[3])}</p></article>`).join("")}</div><p class="disclaimer">${t("These examples represent professional experience contributed by team members during their careers. Project identities are withheld where confidentiality applies.","تمثل هذه النماذج خبرات مهنية شارك بها أعضاء الفريق خلال مسيرتهم العملية ويتم حجب هوية المشروعات عندما تتطلب السرية ذلك")}</p></div></section>

    <section class="security"><div class="shell"><div><p class="eyebrow">${t("CONFIDENTIALITY & CONTROL","السرية وضبط المعلومات")}</p><h2>${t("Your drawings and documents remain protected","لوحاتك ومستنداتك تظل محمية")}</h2><p>${t("Client information is handled confidentially. NDA, controlled access, revision tracking and documented handover are available for every engagement.","يتم التعامل مع معلومات العميل بسرية مع إتاحة اتفاقية عدم إفصاح وصلاحيات وصول منضبطة وتتبع للإصدارات وتسليم موثق لكل تعاقد")}</p></div><span>✓ NDA</span></div></section>

    <section id="founder" class="section shell founder-section">
      <div class="founder-card">
        <div class="founder-avatar"><img src="https://eslam-reda-dc.github.io/images/profile.jpg" alt="Eslam Reda Abdelrahman — Founder of NASQ Project Solutions" loading="lazy"></div>
        <div class="founder-content">
          <p class="eyebrow">${t("FOUNDER & PROFESSIONAL LEAD","مؤسس المشروع والإشراف المهني")}</p>
          <h2>${t("Eslam Reda Abdelrahman","إسلام رضا عبدالرحمن")}</h2>
          <p class="founder-role">${t("Senior Document Controller · Founder of NASQ Project Solutions","مراقب أول وثائق · مؤسس نَسَق لحلول المشروعات")}</p>
          <p>${t("Construction and real estate documentation professional supporting structured document workflows, project coding, reporting, electronic archives and remote project delivery across Egypt and Saudi Arabia.","متخصص في إدارة مستندات مشروعات الإنشاءات والتطوير العقاري، وتأسيس الدورات المستندية وأنظمة التكويد والتقارير والأرشفة الإلكترونية ودعم المشروعات عن بُعد في مصر والسعودية.")}</p>
          <div class="founder-metrics"><span>${t("3,500+ document references","أكثر من 3,500 مرجع مستندي")}</span><span>${t("160+ project reports","أكثر من 160 تقريرًا")}</span><span>${t("Egypt & Saudi Arabia","مصر والسعودية")}</span></div>
          <div class="founder-links"><a class="primary" href="https://eslam-reda-dc.github.io/" target="_blank" rel="noopener">${t("View professional portfolio","زيارة البورتفوليو المهني")} ↗</a><a class="secondary" href="https://www.linkedin.com/in/eslam-reda-576320172/" target="_blank" rel="noopener">${t("LinkedIn profile","الملف المهني على LinkedIn")} ↗</a></div>
        </div>
      </div>
    </section>

    <section id="contact" class="section shell contact"><div><p class="eyebrow">${t("REQUEST A SCOPE REVIEW","اطلب مراجعة نطاق العمل")}</p><h2>${t("Tell us what your project needs","أخبرنا بما يحتاجه مشروعك")}</h2><p>${t("Choose Document Control, Technical Office, or the combined service. Technical Office and combined requests then show the relevant work disciplines.","اختر إدارة المستندات أو المكتب الفني أو الخدمة المجمعة وعند اختيار المكتب الفني أو الخدمة المجمعة ستظهر تخصصات الأعمال المطلوبة")}</p><div class="routing"><b>${t("Clear request classification","تصنيف واضح للطلبات")}</b><span>${t("All requests → NASQ main inbox","جميع الطلبات ← البريد الرئيسي لنَسَق")}</span><span>${t("Technical Office or combined service → Select the work discipline","المكتب الفني أو الخدمة المجمعة ← اختر تخصص الأعمال")}</span><span>${t("The request type appears in the email subject","نوع الطلب يظهر في عنوان الرسالة")}</span></div></div>
      <form id="quoteForm"><div class="form-grid"><label>${t("Name","الاسم")}<input name="name" autocomplete="name" required></label><label>${t("Email","البريد الإلكتروني")}<input name="email" type="email" autocomplete="email" required></label><label>${t("Phone / WhatsApp","رقم الهاتف / واتساب")}<input name="phone" type="tel" autocomplete="tel" required></label><label>${t("Company","الشركة")}<input name="company" required></label><label>${t("Project country","دولة المشروع")}<select name="country"><option value="">${t("Select country","اختر الدولة")}</option><option value="Egypt">${t("Egypt","مصر")}</option><option value="Saudi Arabia">${t("Saudi Arabia","السعودية")}</option><option value="Other">${t("Other","دولة أخرى")}</option></select></label><label>${t("Project type","نوع المشروع")}<input name="project" placeholder="${t("e.g. residential, commercial or administrative","مثال سكني أو تجاري أو إداري")}" required></label><label>${t("Service type","نوع الخدمة")}<select name="service_line" id="serviceLine" required><option value="" disabled ${selectedService === "" ? "selected" : ""}>${t("Select service type","اختر نوع الخدمة")}</option><option value="Document Control" ${selectedService === "Document Control" ? "selected" : ""}>Document Control / إدارة المستندات</option><option value="Technical Office" ${selectedService === "Technical Office" ? "selected" : ""}>Technical Office / المكتب الفني</option><option value="Document Control & Technical Office" ${selectedService === "Document Control & Technical Office" ? "selected" : ""}>Document Control &amp; Technical Office / إدارة مستندات ومكتب فني</option></select></label><label id="activityField" class="work-type-field" ${!selectedService || selectedService === "Document Control" ? "hidden" : ""}>${t("Required work discipline","نوع الأعمال المطلوبة")}<select name="activity" id="activity"><option value="" disabled ${selectedActivity === "" ? "selected" : ""}>${t("Select work discipline","اختر نوع الأعمال")}</option>${[["Architectural","Architectural / معماري"],["Structural","Structural / إنشائي"],["Electrical","Electrical / كهرباء"],["Mechanical","Mechanical / ميكانيكا"],["Surveying","Surveying / مساحة"]].map(x=>`<option value="${x[0]}" ${selectedActivity === x[0] ? "selected" : ""}>${x[1]}</option>`).join("")}</select></label><label>${t("Preferred package","الباقة المفضلة")}<select name="plan" id="planSelect"><option ${selectedPlan === "Essential" ? "selected" : ""}>Essential</option><option ${selectedPlan === "Professional" ? "selected" : ""}>Professional</option><option ${selectedPlan === "Project Partner" ? "selected" : ""}>Project Partner</option></select></label><label>${t("Approx. scope volume","الحجم التقريبي لنطاق العمل")}<input name="volume" placeholder="${t("e.g. area, drawings, documents or BOQ items","مثال المساحة أو عدد اللوحات أو المستندات أو البنود")}"></label><label>${t("Required delivery date","موعد التسليم المطلوب")}<input name="date" type="date"></label></div><label>${t("Scope details and available inputs","تفاصيل النطاق والمدخلات المتاحة")}<textarea name="message" rows="5" required></textarea></label><button class="primary" id="submitButton" type="submit">${t("Send request now","إرسال الطلب الآن")}</button><div class="submit-status" id="submitStatus" aria-live="polite"></div><p class="form-note">${t("The request is sent securely without opening Gmail or Outlook. Keep the reference number for follow-up.","يتم إرسال الطلب مباشرة دون فتح Gmail أو Outlook واحتفظ برقم الطلب للمتابعة")}</p></form>
    </section>

    <section class="section shell discovery-section"><p class="eyebrow">${t("EXPLORE NASQ","استكشف نَسَق")}</p><h2>${t("Practical resources for your next project decision","موارد عملية تساعدك في قرار مشروعك القادم")}</h2><div class="discovery-grid">
 <article><h3>${t("Services & delivery","الخدمات وآلية التنفيذ")}</h3><a href="services/document-control/">${t("Document Control","إدارة المستندات")} ↗</a><a href="services/technical-office/">${t("Technical Office","المكتب الفني")} ↗</a><a href="services/shop-drawings/">${t("Shop Drawings","اللوحات التنفيذية")} ↗</a><a href="services/quantity-surveying/">${t("Quantity Surveying & BOQ","حصر الكميات وجداول الكميات")} ↗</a><a href="services/project-handover/">${t("Handover & Archiving","التسليم والأرشفة")} ↗</a></article>
 <article><h3>${t("Interactive project tools","أدوات تقييم المشروعات")}</h3><a href="tools/document-control-health-check/">${t("Document control health check","تقييم إدارة المستندات")} ↗</a><a href="tools/scope-estimator/">${t("Project support scope estimator","تقدير نطاق دعم المشروع")} ↗</a><a href="tools/dashboard-demo/">${t("Interactive dashboard demo","نموذج لوحة متابعة تفاعلية")} ↗</a><a href="cases/">${t("Professional case studies","دراسات الحالة المهنية")} ↗</a></article>
 <article><h3>${t("Knowledge & client resources","المعرفة وموارد العملاء")}</h3><a href="insights/">${t("Document control knowledge center","مركز معرفة إدارة المستندات")} ↗</a><a href="resources/company-profile/">${t("Printable company profile","الملف التعريفي القابل للطباعة")} ↗</a><a href="resources/proposal-template/">${t("Professional proposal template","نموذج عرض الخدمات")} ↗</a><a href="markets/saudi-arabia/">${t("Saudi project support","دعم المشروعات السعودية")} ↗</a><a href="markets/egypt/">${t("Egypt project support","دعم المشروعات المصرية")} ↗</a></article>
</div></section>
<a class="floating-whatsapp" href="https://wa.me/201111687891?text=Hello%20NASQ%2C%20I%20would%20like%20to%20discuss%20project%20support." target="_blank" rel="noopener" aria-label="WhatsApp">${t("WhatsApp","واتساب")}</a>
    <footer class="footer shell"><div class="brand"><span>N</span><b>NASQ <small>Project Solutions</small></b></div><p>${t("Founded by Eslam Reda Abdelrahman · Remote Document Control & Technical Office Support","تأسيس إسلام رضا عبدالرحمن · إدارة المستندات ودعم المكتب الفني عن بُعد")}</p><a href="https://eslam-reda-dc.github.io/" target="_blank" rel="noopener">${t("Founder portfolio","بورتفوليو المؤسس")}</a><a href="https://www.linkedin.com/in/eslam-reda-576320172/" target="_blank" rel="noopener">LinkedIn</a><p>© 2026 NASQ Project Solutions</p></footer>
  </main>`;
  bindEvents();
}

function updateActivityVisibility() {
  const field = document.getElementById("activityField");
  const select = document.getElementById("activity");
  const show = selectedService && selectedService !== "Document Control";
  field.hidden = !show;
  select.required = Boolean(show);
  if (!show) { selectedActivity = ""; select.value = ""; }
}

function trackNasqEvent(event, details = {}) {
  try {
    const storageKey = "nasq_local_events";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.push({ event, details, time: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(-100)));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...details });
  } catch (_) { /* Analytics remain optional and local. */ }
}

function bindEvents() {
  document.getElementById("langButton").addEventListener("click", () => { arabic = !arabic; render(); });
  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
    selectedService = link.dataset.service || "";
    selectedActivity = link.dataset.activity || "";
    setTimeout(() => { document.getElementById("serviceLine").value = selectedService; document.getElementById("activity").value = selectedActivity; updateActivityVisibility(); }, 0);
  }));
  document.querySelectorAll("[data-plan]").forEach(link => link.addEventListener("click", () => {
    selectedPlan = link.dataset.plan;
    setTimeout(() => { document.getElementById("planSelect").value = selectedPlan; }, 0);
  }));
  document.getElementById("serviceLine").addEventListener("change", e => { selectedService = e.target.value; selectedActivity = ""; updateActivityVisibility(); });
  document.getElementById("activity").addEventListener("change", e => { selectedActivity = e.target.value; });
  document.getElementById("planSelect").addEventListener("change", e => { selectedPlan = e.target.value; });
  document.getElementById("quoteForm").addEventListener("submit", submitForm);
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => link.addEventListener("click", () => trackNasqEvent("whatsapp_click", {location:"main_site"})));
  trackNasqEvent("page_view", {page:"main_site", language:arabic?"ar":"en"});
  updateActivityVisibility();
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = document.getElementById("submitButton");
  const status = document.getElementById("submitStatus");
  const data = new FormData(form);
  const service = String(data.get("service_line") || "");
  const activity = service === "Document Control" ? "Document Control" : String(data.get("activity") || "");
  const requestId = `NASQ-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const responsibleEmail = activity === "Architectural" ? architecturalEmail : activity === "Structural" ? structuralEmail : "";
  const label = service === "Document Control & Technical Office" ? `إدارة مستندات + ${activitySubject[activity] || activity}` : activitySubject[activity] || activity;
  data.set("request_id", requestId);
  data.set("main_contact", primaryEmail);
  data.set("_subject", `NASQ Request | ${label} | ${requestId}`);
  if (responsibleEmail) data.set("responsible_engineer_email", responsibleEmail);
  button.disabled = true;
  button.textContent = t("Sending request…","جارٍ إرسال الطلب…");
  status.innerHTML = "";
  try {
    const response = await fetch(formEndpoint, {method:"POST", body:data, headers:{Accept:"application/json"}});
    if (!response.ok) throw new Error("Submission failed");
    status.innerHTML = `<p class="success">✓ ${t(`Request received successfully. Reference: ${requestId}`,`تم استلام طلبك بنجاح ورقم الطلب ${requestId}`)}</p>`;
    trackNasqEvent("lead_submitted", {service, activity, requestId});
    form.reset();
    selectedService = ""; selectedActivity = ""; selectedPlan = "Professional";
    updateActivityVisibility();
  } catch (error) {
    status.innerHTML = `<p class="error">${t("The request could not be sent. Please check your connection and try again.","تعذر إرسال الطلب يرجى التحقق من الاتصال والمحاولة مرة أخرى")}</p>`;
  } finally {
    button.disabled = false;
    button.textContent = t("Send request now","إرسال الطلب الآن");
  }
}

render();
