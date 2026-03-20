import fs from "fs";

async function run() {
  const markdownPath = "/Volumes/NeverlolDisk/NeverlolDB/2.Areas-支持（责任 保持 坚持）/Obsidian/灵感/项目库/Tableau可视化中台实战/文章初稿.md";
  let content = fs.readFileSync(markdownPath, "utf-8");
  
  // Replace links
  content = content.replace("**01**", "*(注：配图中的敏感信息（如具体企业、销售姓名等）已进行脱敏/马赛克处理，图表仅作实战逻辑展示与参考。)*\n\n**01**");
  content = content.replace("由 25% 飙升到了 55%。\n\n\n**02**", "由 25% 飙升到了 55%。\n\n![行业开发监控看板](/images/tableau/tableau1.png)\n\n\n**02**");
  content = content.replace("保住了东北大区全国续费第一的成绩。\n\n当然", "保住了东北大区全国续费第一的成绩。\n\n![用户精细化运营看板](/images/tableau/tableau2.png)\n\n当然");
  content = content.replace("把大部队的狼性彻底激发了出来。\n\n\n**04**", "把大部队的狼性彻底激发了出来。\n\n![经营分析看板](/images/tableau/tableau3.png)\n\n\n**04**");
  content = content.replace("甚至直接“取代扣扳机的人”**的终极形态。\n\n各位带团队", "甚至直接“取代扣扳机的人”**的终极形态。\n\n![AI自动化行动](/images/tableau/tableau4.png)\n\n各位带团队");

  const sectionsJson = JSON.stringify({
    problem: { title: "业务痛点", content: "销售团队在红海盲打、老客户流失严重、管理者看滞后T+3报表缺乏前线弹药直达。数据和业务完全脱节。" },
    traditional: { title: "传统方案", content: "每天硬性规定 120 通盲打考核，用事后诸葛亮式的 Excel 表和汇报审批做管理，导致动作严重滞后。" },
    ai: { title: "中台/AI 重构", content: "基于 Tableau 打造三大核心沙盘直接引导销售动作；未来引入 OpenClaw 等 AI Agent 彻底用端侧算力替代初始电销团队。" },
    impact: { title: "商业价值", content: "打透『流量高、消耗低』的蓝海，精细化保护老客户生命周期，实现全国第一续费，团队形成强竞争狼性。" }
  });

  const sql = `
UPDATE projects 
SET 
  title = '大厂管理密码：真正牛逼的数据看板，从来不是做给老板看的',
  subtitle = '从「报表搬运工」到「业务全息沙盘」与「AI 自动化开火」',
  tags = ARRAY['Tableau', 'BI中台', '业务重构', '数据运营'],
  metrics = '保盘续费全国第一 | 长尾签单占比飙升30%',
  icon = 'Eye',
  col_span = 'col-span-1 lg:col-span-2',
  sections = '${sectionsJson.replace(/'/g, "''")}'::jsonb,
  markdown_content = '${content.replace(/'/g, "''")}',
  updated_at = NOW()
WHERE id = 'tableau-bi';
`;

  fs.writeFileSync("update_tableau_bi.sql", sql);
  console.log("SQL file generated.");
}

run();
