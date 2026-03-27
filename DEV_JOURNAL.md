# DEV_JOURNAL

这个文件记录了本项目的开发日志与 Build-in-Public 的更新动态。

## 2026-03-22

### 网站架构分析 + 漏斗引导优化框架

**网站架构梳理**

```
1. Header（导航）
   - 核心战役 / 能力引擎 / Build in Public

2. Hero（首屏）
   - 主标题："告别业务盲盒，拿回全盘掌控力"
   - 副标题：前58同城大区运营操盘手...
   - CTA：预约15分钟漏斗诊断 / 查看增长案例

3. PipelineTeaser（漏斗上层）
   - 标签：OpenClaw 增长体系
   - 标题：每个环节都有对应的 Skill
   - 4个节点：获客→筛选→跟进→复购
   - Skill标签：线索获取/画像分析/策略建议/生命周期
   - CTA：看看 Skill 是如何协作的 → 跳转 /campaigns

4. Portfolio（漏斗中层）- SKILL ARSENAL
   - 4个 Case：Bento 布局
   - HomepageSkillDemo（人机协作 Demo）

5. 分流引导区
   - 路径A：知道自己有问题 → #portfolio
   - 路径B：不知道问题在哪 → /campaigns

6. About（个人备书）
   - CAPABILITY ENGINE
   - 3个引擎卡片

7. ConsultingCTA（右下角悬浮）
```

**逻辑问题分析**

1. **PipelineTeaser 与 Demo 重复**
   - 两者都在解释"Agent/Skill 协作"，缺乏层次递进

2. **PipelineTeaser CTA 跳走**
   - CTA "看看 Skill 是如何协作的" → 跳转 /campaigns
   - 但 Demo 就在同一个页面下方，用户应该先看 Demo

3. **大厂沙盘关系模糊**
   - category/[id] 里的 PipelineDemo 是"代码级展示"
   - PipelineTeaser 是"抽象概览"
   - Demo 是"实际运转"
   - 三者关系没有清晰表达

4. **Demo 定位不清**
   - 没有说明它和 PipelineTeaser 的 4 步是什么关系
   - 用户不清楚 Demo 是不是 PipelineTeaser 的细化

**优化方案：分层递进**

| 层级 | 组件 | 定位 | 用户目标 |
|------|------|------|----------|
| L1 抽象 | PipelineTeaser | 概念层：4步闭环是什么 | 知道"有什么" |
| L2 细化 | Demo | 运转层：这4步怎么跑 | 知道"怎么跑" |
| L3 落地 | category/[id] | 代码层：具体 Skill 实现 | 知道"怎么改" |
| L4 案例 | Portfolio Cases | 证明层：之前做过什么 | 相信"能做好" |

**具体改动清单**

1. **PipelineTeaser 改造** ✅ 已完成
   - 标签：58 同城 · 亿级盘口实战沉淀
   - 主标题：强调"从 0 到 1 亿的盘口，提炼出这 4 步增长闭环"
   - 副标题：强调"不是理论，是在大客群、高强度竞争环境下验证过的"
   - 去掉 Skill 标签，改为环节描述（从哪里拉来客户/哪些值得重点跟进...）
   - 添加步骤编号
   - CTA：锚点滚动到 #portfolio → "看看这套体系是怎么运转的"

2. **Demo 改造** ✅ 已完成
   - 左侧添加"4 步闭环如何细化"说明框
   - 展示 L1 的 4 步与 L2 的 10 步对应关系：
     - 获客 → 获客智能体
     - 筛选 → 评分智能体 / 路由智能体
     - 跟进 → 策略智能体 / 销售执行跟进
     - 复购 → 订单管理 / 生命周期监控 / 人工干预 / 续费智能体
   - 底部 CTA：锚点滚动到 #portfolio → "看看这些 Skill 怎么落地"

4. **Logo 更新** ✅ 已完成
   - 将飞书、微信、OpenClaw、QQ 的矢量图从 emoji 替换为本地 logo 图片
   - 文件已复制到 public 目录：feishu-logo.png, wechat-logo.png, openclaw-logo.svg, qq-logo.png
   - 更新 HomepageSkillDemo.tsx 中的 IM 渠道展示使用本地图片

5. **Portfolio Cases 改造** ✅ 已完成
   - 定位：落地层，具体 Skill 方案
   - 每个 Case 要有链接指向 category/[id]
   - 加标签说明对应 PipelineTeaser 的哪一步
   - 新增 pipelineStep 字段，标签样式：蓝色边框 + "→ {步骤名}"
   - 映射关系：
     - case-1 (activation/人力) → 跟进
     - case-2 (lead-scoring/生命周期) → 复购
     - case-3 (attribution/归因诊断) → 筛选
     - case-4 (sales-enablement/动能重构) → 跟进

6. **首页 L1→L4 顺序修复** ✅ 已完成
   - 问题：Demo 嵌套在 Portfolio 内部，PipelineTeaser CTA 指向 #portfolio
   - 修复：
     - 将 HomepageSkillDemo 从 Portfolio.tsx 移出，作为独立 section
     - 在 page.tsx 中顺序调整为：PipelineTeaser → Demo (L2) → Portfolio (L4)
     - Demo section 添加 id="demo"
     - PipelineTeaser CTA 从 `/#portfolio` 改为 `/#demo`
   - /campaigns 页面结构正常，包含 CampaignFlowCanvas + category 链接

7. **沙盘与 Demo 协作关系建立** ✅ 已完成
   - 问题：沙盘变成孤岛，Demo 和沙盘没有关联
   - 修复：
     - PipelineTeaser CTA 指向 `/campaigns` 沙盘
     - /campaigns 底部新增"看完沙盘后引导看 Demo"区块
     - Demo section 顶部新增"基于 58同城亿级盘口业务沙盘提取"标签
   - 现在的漏斗流程：
     - PipelineTeaser → /campaigns (看沙盘验证)
     - /campaigns 底部 → /#demo (看 Skill 执行)
     - Demo 底部 → /#portfolio (看 Skill 案例)

8. **/campaigns 页面文案重构** ✅ 已完成
   - 问题：元素混乱，与 PipelineTeaser 的 4 步闭环不一致
   - 重构后的结构：
     1. 标签：58同城 · 亿级盘口实战验证
     2. 标题：从线索到利润，4步增长闭环（与 PipelineTeaser 一致）
     3. 副标题：获客 → 筛选 → 跟进 → 复购，强调 OpenClaw 可拆解执行
     4. 沙盘（核心内容）
     5. 沙盘后引导：看 Skill 执行 Demo
     6. Skill 落地匹配区：3 个痛点卡片，对应 Step 1/2-3/4
   - 删除了冗余的"核心能力 4 卡片"区块
   - 痛点卡片直接带 Step 编号，对应 PipelineTeaser 的 4 步

9. **沙盘装修：融入 PipelineTeaser 体系** ✅ 已完成
   - 在不改动沙盘内容的基础上增加装修元素：
     - 沙盘顶部：Step 标注条（Step 1-4 + 获客/筛选/跟进/复购）
     - 沙盘左上角：对应 PipelineTeaser 4步闭环标注
     - 沙盘右上角：图例（蓝色=正向流转，红色=异常回流）
     - 沙盘底部：管线统计（正向链路24条、异常回流8条、核心节点28个）
     - 操作提示：拖动浏览 · 滚轮缩放

10. **Skill 认知建立区** ✅ 已完成
    - 问题：用户不知道 Skill 是什么，看完沙盘后无法理解"看 Skill 执行 Demo"
    - 解决方案：在沙盘之前添加 Skill 解释区块
    - 内容：
      - 标题：这套体系是怎么跑起来的
      - 核心定义：Skill = 数字员工，AI 替你执行具体动作的单位
      - 类比：就像餐厅里有切菜机器人、洗碗机——每个都是独立的 Skill
      - 对比：传统方式 vs Skill 方式（3个场景对比）
      - 示例：线索获取 Skill、画像分析 Skill、策略建议 Skill、生命周期监控 Skill

---

### HomepageSkillDemo 全链路重写 - 人机协作 + 全生命周期

**背景**
- 原 Demo 逻辑存在问题：评分需要基于人工跟进产生的沟通记录作为输入
- 路由分配需要考虑 Skill 匹配
- 缺乏客户生命周期视角（订单 → 续费 → 异常干预）
- 需要明确哪些节点是 Agent 替代，哪些需要人工介入

**全链路节点梳理**

| 节点 | 类型 | 说明 |
|------|------|------|
| 获客智能体 | Agent | 自动采集、清洗线索 |
| 销售初步跟进 | 人工 | 获取客户需求、预算、Timeline |
| 评分智能体 | Agent | 基于沟通记录做 A/B/C 分层 |
| 路由智能体 | Agent | Skill 匹配 + 强制捆绑规则 |
| 策略智能体 | Agent | 生成个性化跟进策略 |
| 销售执行跟进 | 人工 | 按策略执行，微信/飞书/电话跟进 |
| 订单管理 | Agent | 自动记录订单状态、交付进度 |
| 生命周期监控 | Agent | 180 天监控，异常自动预警 |
| 人工干预 | 人工 | 收到预警后执行干预 |
| 续费智能体 | Agent | 提前 60 天预测续费意向 |

**核心改造**

1. **节点类型区分**
   - `type: "agent"` - 蓝色标识，OpenClaw Logo 标签
   - `type: "human"` - 紫色标识，人工执行标签

2. **右侧策略详情展示**
   - 输入：进入该节点的数据
   - 执行动作：具体做了什么
   - 输出：产出的结果

3. **IM 渠道展示**
   - 新增 IM 渠道展示条："人机交互发生在你熟悉的 IM 里"
   - 图标：📮 飞书、💬 微信、💭 QQ

4. **Agent 命名**
   - 统一使用"智能体"替代"Agent"
   - 更通俗易懂，降低理解门槛

5. **OpenClaw 品牌强化**
   - 使用官方 Logo 图片替代 🦞 emoji
   - Logo URL: 官方提供的 URL
   - 标题 + 侧边栏 + 节点处都显示 Logo

6. **自动循环播放**
   - 页面加载后自动开始循环播放
   - 每步停留 3.5 秒
   - 循环到最后一个节点后自动回到第一个
   - 右上角按钮改为"暂停/继续"

**改造文件**
- `src/components/HomepageSkillDemo.tsx` - 完全重写
- `src/components/Portfolio.tsx` - 简化调用，更新文案

---

### Category 详情页改造完成（Step 1-3）

**背景**
- 用户选择方案 B：竖向 Pipeline 轨道（左侧）+ 代码块（右侧）的布局
- 每步停留 5 秒，展示对应代码片段 + annotation 说明
- 强调 Skill 替代的环节

**完成的改造**

1. **Step 1**: Header 增加痛点展示块（红色边框警告样式）
   - 定义 `SKILL_PAIN_POINTS` 数据结构
   - 每个 Skill 有 problem + why 两个字段
   - 样式：红色边框 + 警告图标

2. **Step 2**: PipelineDemo 组件（竖向轨道 + 代码块布局）
   - 新建 `/src/components/PipelineDemo.tsx`
   - 左侧：竖向 Pipeline 轨道，节点带 icon
   - 右侧：代码块展示 OpenClaw 伪代码
   - 底部提示板：展示 annotation 文字
   - 每步停留 5 秒，支持"运行 Pipeline"按钮

3. **Step 3**: 执行逻辑区域（绿色 STEP 标签）
   - 定义 `SKILL_EXECUTION_LOGIC` 数据结构
   - 每个 Skill 有 summary + 3 个 steps
   - 样式：3 列卡片，顶部绿色 "STEP N" 标签

**页面结构**
```
├── Category Header
│   ├── Icon + Title
│   ├── 痛点展示块（红色警告）
│   └── 原始描述
├── Skill 演示（PipelineDemo 组件）
├── 执行逻辑（3步以内，绿色标签）
└── 适用场景（Cases List）
```

**关键文件**
- `src/app/category/[id]/page.tsx` - 新增 SKILL_PAIN_POINTS、SKILL_PIPELINES、SKILL_EXECUTION_LOGIC
- `src/components/PipelineDemo.tsx` - 新建核心组件

---

### 商业化分析：飞书 vs 企业微信

**核心结论**：不适合直接对比，是两条不同的商业路径

| 阶段 | 平台 | 原因 |
|------|------|------|
| 初期变现 | 企业微信 | 快速触达小老板，按月订阅 |
| 中期标准化 | 飞书 | 把验证过的 Skill 做成标准产品 |
| 长期品牌 | 飞书 + 企业微信 | 两边都做，看客户需求 |

**文档已同步到 Obsidian**
- `03_知识库Knowledge/商业模式/2026-03-21-飞书vs企业微信-OpenClaw部署平台选择分析.md`

---

### /campaigns 页面重构 + 全面词汇审查

**背景**
- 用户反馈：/campaigns 文案有"大厂成就展"感，需要改成"你的问题我能解"
- "部门墙"等词汇 B 端老板听不懂
- 需要去掉大厂互联网黑话

**/campaigns 重构内容**

1. **顶部文案重构**
   - 原: "100%像素级还原年产值过亿的电销体系底层架构"
   - 改: "不管你做什么生意，都能用这3步搞定增长：获客 → 成交 → 复购"

2. **顶部增加痛点引导**
   - 获客成本越来越高
   - 10个客户进来只成交1-2个
   - 客户签完就不回来了

3. **核心能力标签改造**
   - "渠道 ROI 优化" → "知道哪分钱打水漂"
   - "销售漏斗建模" → "提升成交率"
   - "LTV 提升策略" → "让客户持续回头"
   - "大模型落地应用" → "AI 自动化执行"

4. **"我能为你做什么" → "你的业务遇到什么问题"**
   - 问题1: 获客越来越贵
   - 问题2: 成交率太低
   - 问题3: 客户不回头

5. **CTA 改造**
   - 原: "立即咨询"
   - 改: "你是哪种业务？" → 分流到对应 category/[id]

**全面词汇审查**

| 原词 | 改为 |
|------|------|
| 部门墙 | 互相推诿 |
| 甩锅 | 推诿 |
| LTV | 续费价值/复购价值 |
| RFM 分层 | 按价值分级 |
| 归因诊断 | 找原因诊断 |
| 漏斗转化 | 成交转化 |
| 线索 | 潜在客户 |
| SFA | 销售跟进 |
| 商机 | 订单/签单机会 |

**改造的文件**
- `/campaigns/page.tsx` - 文案全面重构
- `Hero.tsx` - 底部三卡片文案改造
- `About.tsx` - 能力描述词汇改造
- `Portfolio.tsx` - 案例卡片文案改造
- `category/[id]/page.tsx` - SKILL_PAIN_POINTS、CATEGORY_MAP 等文案改造
- `capability/page.tsx` - 描述文案改造

---

### 首页结构优化：分流引导区

**背景**
- 两条路径（Portfolio vs PipelineTeaser）没有明确的分流逻辑
- 用户不知道该走哪条路

**改造内容**

1. **PipelineTeaser 改造**
   - 标签: "Data Pipeline Architecture" → "增长体系全景"
   - 标题: "从线索到利润的全链路数据提纯" → "生意增长的4步闭环"
   - 步骤简化: "全域线索捕获/AI漏斗清洗/自动化CRM强控/LTV利润提纯" → "获客/筛选/跟进/复购"
   - 按钮: "解密58铁军过亿盘口的业务全景蓝图" → "看看这套体系是怎么运作的"

2. **新增分流引导区**
   - 位置: Portfolio 和 About 之间
   - 标题: "你属于哪种情况？"
   - 路径A（蓝色）: 知道自己有问题 → 锚点到 #portfolio
   - 路径B（紫色）: 不知道问题在哪 → 跳转到 /campaigns

**改造文件**
- `page.tsx` - 新增分流引导区
- `PipelineTeaser.tsx` - 步骤和按钮文案改造

---

### P0: 首页 Skill Demo 改造 - 商业闭环逻辑

**背景**
- 原来的 Demo 只是单步 Skill 执行，用户看不懂闭环
- 需要改成：多个 Agent + 多个 Skill 协作的完整闭环

**改造内容**

1. **完全重写 `HomepageSkillDemo.tsx` 组件**
   - 展示多个 Agent 调用不同 Skill 协作完成闭环
   - 左侧：Agent 链路（获客 Agent → 评分 Agent → 路由 Agent → 跟进 Agent）
   - 右侧：实时输出（输入 → Skill 处理 → 输出 → 传递给下一个 Agent）
   - 底部：闭环完成汇总

2. **案例改为「销售自动化闭环」**
   - 获客 Agent + 线索获取 Skill
   - 评分 Agent + NLP 画像 Skill
   - 路由 Agent + 分层策略 Skill
   - 跟进 Agent + 跟进执行 Skill
   - 最终：本周成交 23 单，金额 ¥46.8 万

3. **核心改变**
   - 从「单步 Skill 执行」到「多 Agent 协作闭环」
   - 输出直接传递给下一个 Agent，而不是直接推给用户
   - 展示完整闭环的商业价值

**改造文件**
- `src/components/HomepageSkillDemo.tsx` - 完全重写
- `src/components/Portfolio.tsx` - 更新组件配置

---

### HomepageSkillDemo 人机协作改造

**背景**
- 原 Demo 存在逻辑问题：把"跟进"设计成 Agent 自动执行
- 实际情况：销售环节需要人去做，Agent 的作用是分析并给出策略建议
- 核心观点：需要人完成的部分还是得由人去做

**改造内容**

1. **Agent 链路调整**
   - 原: 获客 Agent → 评分 Agent → 路由 Agent → **跟进 Agent（自动跟进）**
   - 改: 获客 Agent → 评分 Agent → 路由 Agent → **策略 Agent（给出建议）**

2. **节点数据更新**
   ```typescript
   {
     id: "strategy",
     agent: "策略 Agent",
     skill: "策略建议 Skill",
     input: "A类 580 客户跟进记录",
     output: "本周建议跟进 23 组高价值客户",
     action: "策略推送给人执行"
   }
   ```

3. **最终结果文案调整**
   - 原: "本周成交 23 单，金额 ¥46.8 万。结果已推送至你的 IM 系统。"
   - 改: "策略 Agent 已生成 23 组客户跟进建议并推送给人执行。预计本周可成交 ¥46.8 万。"

4. **底部完成状态调整**
   - 原: "多个 Agent 协作完成从获客到成交的全流程"
   - 改: "Agent 分析数据、生成策略建议，人执行具体销售动作"

5. **最后一步特殊提示**
   - 最后一步（策略 Agent）显示: "策略建议生成中，推送给销售人员执行"

**改造文件**
- `src/components/HomepageSkillDemo.tsx` - DEFAULT_NODES、文案调整
- `src/components/Portfolio.tsx` - nodes 配置同步更新

---

## 2026-03-20

### Phase 2 战略会议：Portfolio 重塑为 Skill 方案库

**会议背景**
- 用户已明确：不再以"求职者履历"为底色，而是"OPC 一人公司 / 微咨询武器库"
- 核心交付形态想清楚了：Skill（AI 执行单元）→ 通过 OpenClaw 小龙虾部署
- 当前状态：商业模式清晰了，但 Skill 还没开始封装（Phase 2 是先把展示层改好）

**Skill 详情页设计决策**（需后续开发）

```
路由：/skill/[id]  （/category/[id] 保留 SEO 301 重定向）

页面结构：
┌─────────────────────────────────────────┐
│ [Terminal Demo 块]                      │
│ $ openclaw run skill-name --input xxx   │
│ > 实时输出结果（模拟动画 UI）              │
├─────────────────────────────────────────┤
│ 这个 Skill 解决什么问题                   │
│ 为什么传统方式失败                        │
│ Skill 执行逻辑（3 步以内）                │
├─────────────────────────────────────────┤
│ [GitHub 链接]  ← 可部署到 OpenClaw       │
└─────────────────────────────────────────┘
```

**关键技术决策**
- Demo 采用**模拟终端动画 UI**，不需要真的跑通 OpenClaw
- 现在做的是"产品概念图"，等 Skill 真实封装后可替换为"真实产品截图"
- 最终交付：通用版 Skill 展示可能性 → 客户咨询后按需定制

**商业模式分层**
```
第一层：网站展示    → 钩子（让 B 端老板看到可能性）
第二层：Skill 开发  → 还没开始（先改展示层）
第三层：OpenClaw   → 还没开始"养虾"
第四层：客户交付    → 按需定制适配不同业务场景
```

**Portfolio.tsx 改造清单（Phase 2 执行项）**
1. 标题："CORE BATTLES" → "SKILL ARSENAL / 可部署方案库"
2. 副标题：去掉"战绩复盘"味道，加"可部署"感
3. 每个 case 文案重塑（metric 后面加"可复用因子"标注）
4. 路由暂时保留（等 Skill 详情页建好再改链接）
5. 新增 TerminalDemo 组件（模拟 Skill 执行动画 UI）

**下一步**
- Phase 2.1: Portfolio.tsx 文案改造
- Phase 2.2: 新建 TerminalDemo 组件
- Phase 2.3: Skill 详情页开发（等真实 Skill 封装后再做）

---

### Antigravity 平台 dangerous mode 排查记录

- 用户在 Antigravity 的 Claude Code 插件中勾选了 "Dangerously skip permissions"
- 重启 Antigravity 后新 session 仍有确认弹窗，说明设置未生效
- 解决方案：改用终端直接运行 `claude --dangerously-skip-permissions`
- 建议用户后续在终端 session 中继续开发

---

### Hooks 配置核查（未找到预期的日志双写功能）

**实际情况：**
- `auto-commit.sh` → 自动 git commit，但**跳过所有 .md 文件**
- `post-tool-use-tracker.sh` → 追踪文件变更用于构建命令

**预期 vs 现实：**
- 用户期望：对话内容自动双写到 DEV_JOURNAL + 全局日志
- 实际情况：没有这个功能的 hook，需手动记录

---

## 2026-03-15
- 🤖 **Antigravity** (15:20): 【内容创作】在 `Tableau可视化中台实战` 项目库中，根据用户《大厂实战运营复盘》的旧日记与个人经历，利用 `article-writer` 技能，通过多轮调整（去车金融化、重构内卷赛马逻辑、细化 B 端 RFM 案例），输出了第一篇 2500+ 字的高质量实战文章《大厂管理密码：真正牛逼的数据看板，从来不是做给老板看的》。
- 🤖 **Antigravity** (21:32): 【内容迭代】基于第一稿《大厂管理密码》，响应最新思潮，在文末增加了关于用时下爆火的 AI 技术（如 OpenClaw 小龙虾等 Agent 工具）重塑传统 BI 痛点的思考。探索从“数据可视化发弹药”向“AI 自动化开火”的终极演进。
- 🤖 **Antigravity** (22:15): 【正式发布】完成文章配图处理，通过 Python PIL 对原始 Tableau 沙盘大屏的 PII 隐私信息（如企业名称、销售姓名等）进行了自动化打码脱敏，并连同 Nanabanana 生成的 AI 概念插图一起压缩上传。最终将完整图文排版后注入网站 Supabase 数据库的 `attribution`（大盘归因诊断）核心栏目下，正式完成上线。

---

## 2026-03-22（续）

### Skill/Agent/Hero 概念梳理与文案优化

**概念关系澄清：**
- **OpenClaw** = AI 员工的管理系统（像公司管员工一样管 AI）
- **Agent** = 数字员工，AI 员工（执行具体动作的人）
- **Skill** = 员工的技能手册，把老销售的经验变成 AI 能执行的步骤

**问题：**
1. Skill 和 Agent 混为一谈，用户不知道 Skill 是什么
2. Hero 副标题说"封装为 AI Skill"但没有解释
3. 底部卡片文案使用"NLP"等 B 端老板听不懂的术语

**Hero 副标题修改：**
- 原：前58同城大区运营操盘手。用过大厂级增长体系，现在把这套经验封装为 AI Skill，让机器替你执行——人肉运营时代已死。
- 改：前58同城大区运营操盘手。把大厂增长体系拆成一个个「技能手册」挂载到 OpenClaw 系统里——AI 员工学会了，机器替你执行，人只做关键的决策。

**底部三卡片文案优化：**
- "全天候问题预警"：AI 员工 24 小时盯着，有异常自动发消息告诉你。不用等员工汇报，问题早就定位好了。
- "客户价值分级"：AI 自动把客户分成三六九等。哪个值得重点跟进，哪个可以自动维护，不用靠销售自己判断。
- "沉睡客户激活"：三个月没活跃的客户，AI 自动发消息、打电话激活。销售不用一个个跟进，节省时间攻新单。

**/campaigns Skill 认知区优化：**
- 副标题：4 步闭环里的每一步，都可以把「老销售脑子里的经验」变成 AI 员工能执行的技能手册
- 核心定义：Skill = 技能手册，不是小工具，是工作手册
- 三者关系：OpenClaw 是管理系统，Agent 是数字员工，Skill 是工作手册
- Skill 方式描述去掉了"NLP"，改为"AI 读懂客户说了啥"
- 示例改为更通俗：线索获取手册、客户评分手册、跟进策略手册、流失预警手册

12. **OpenClaw 品牌强化：文字前添加 Logo** ✅ 已完成
    - 在所有出现 "OpenClaw" 文字的位置前面添加小龙虾 Logo 图片
    - 修改的文件：Hero.tsx、PipelineTeaser.tsx、page.tsx、Portfolio.tsx、PipelineDemo.tsx、TerminalDemo.tsx、campaigns/page.tsx

---

### [2026/03/22 23:05:00] 🤖 Antigravity
**进展摘要：**
执行 `daily-focus` 指令，按照项目现有的卡片模板快速生成周六与周日两份周末聚焦笔记。
梳理了对《飞书 2026 春季发布会》业务融合的思考积淀，并将周末在脑排区发酵的“微咨询沙盘重构”主线汇聚到下周规划中，为个人门户的 B 端化提供战略支撑。

---

### [2026/03/22 23:06:00] 🤖 Antigravity
**进展摘要：**
**进展摘要：**
记录下周两大护城河级提效任务：多 Agent 并行编排（解决复杂业务管线的拆分和下发）与各主流应用接口/MCP方案收集（打通 OpenClaw 系统到市面主流工具的底层脉络）。这套基建是大规模部署微咨询落地方案的前提。

### [2026/03/22 23:22:00] 🤖 Antigravity
**进展摘要：**
提交的下周三路并行战役草案与用户构想产生偏差。停止盲目开发，项目进入休眠待办状态，等待明日早盘（Daily Focus）对齐真实的商业落地直觉后再进行下一轮迭代。

---

### [2026/03/23 08:20:00] 🤖 Antigravity
**进展摘要：**
进入每日聚焦讨论，彻底纠正了昨晚关于“多 Agent 与 MCP”的抽象架构误解。
用户真实的提效迫切点在于自身 Vibe Coding 操作流的极致进化：
1. **多开并行流派**：通过同时开启多个终端实例（多个 Claude Code），让不同端口的 AI 并发处理无强依赖边界的任务，消除人类的“傻等真空期”。
2. **反爬抓取 MCP**：解决微信公众号/小红书等极强防爬页面的 Markdown 化抓取痛点（取代极低效的 Obsidian 碎化剪藏）。此举也是学习 MCP 挂载的最佳真实场景。
这才是将“一人公司”算力压榨到极限的超级基建。

---

### [2026/03/23 08:26:00] 🤖 Antigravity
**进展摘要：**
解答关于全自动执行（Dangerously 模式）的系统差异：确立了“双刀流”兵器谱——让终端里的 Claude Code 利用防撤回特权拉满无脑批处理，保留 Antigravity 强审核护城河用作高精度的代码手术刀，这也是后续多终端并发的核心指导思想。

---

### [2026/03/23 08:31:00] 🤖 Antigravity
**进展摘要：**
确立跨端（Antigravity ↔ Claude Code）的“无缝握手协议”：抛弃让人类复述上下文的低效做法，引入动态 `CLAUDE.md` 和 `.cursorrules` 靶向注入机制。早盘用 Antigravity 聊透需求后，自动将精确待办写入该文件；终端启动 Claude Code 时无需任何前置 Prompt 即可无痛承接战略意志，实现一人公司的指令下发全自动流转。

---

### [2026/03/23 08:35:00] 🤖 Antigravity
**进展摘要：**
梳理终端 Claude Code 常驻模式下的上下文刷新问题。制定微操 SOP：跨端执行新任务时，严禁在旧的会话进程（REPL）里硬续流转，必须借由 `Ctrl+C` 断开退回普通终端界面，再利用带参完整指令 `claude "执行当前CLAUDE.md里的新任务" --dangerously-skip-permissions` 唤起一个纯净的新进程。这是保障新战略 100% 挂载防污染的铁律。

---

### [2026/03/23 08:56:00] 🤖 Antigravity
**进展摘要：**
进入业务深水区探讨：当微信/飞书官方下场普及 OpenClaw 底座时，个体户的护城河究竟在哪？
用户敏锐察觉到“代客定制开发 Skill”极易沦为出卖时间的重度技术外包。
确立 OPC 的终极解法：**产品化服务（Productized Service）与利基市场（Niche Down）**。不接非标的定制开发，而是直接售卖针对特定行业（大额低频电销、本地生活）的“标准操作 SOP + 开箱即用的 OpenClaw 卡带组件包”。护城河在于百万级真金白银砸出来的“行业 Know-how 与转化漏斗”，绝不是写 Prompt 的技术。大厂普及底座（修路），反而为我们省去了教育客户的成本，直接卖“跑车（商业方案）”。

---

### [2026/03/23 09:05:00] 🤖 Antigravity
**进展摘要：**
发生重大战略转折（Aha Moment）！基于用户深度的底层思考，指出了“平台卖广告(B2B跨端电销)”与“商家接活(B2C被动入站)”的模式错位。
正式重置 OPC 微咨询的 ICP（Ideal Customer Profile 理想客群画像）：
果断过滤掉模式过轻的普通下沉服务商；全面瞄准**“B2B 企服/区域代理体系/重度电销军团”**（如360代理、财税外包、长周期高客单价业务）。你去沈阳拜访的“奇虎”前领导盘口，正是验证这套“58电销洗脑包Skill化”最绝佳的首个 PMF 实战测试场！

---

### [2026/03/23 09:10:00] 🤖 Antigravity
**进展摘要：**
精确界定交付属性：彻底打消“做SaaS”的重资产执念。我们售卖的并非传统 SaaS（Software as a Service），而是 **“产品化数字包（Productized System / Digital Assets）”**。我们利用飞书、大模型和 OpenClaw 借鸡生蛋（0 服务器负担，0 代码维护成本），纯赚“业务 SOP + 预置Prompt图纸”的极高溢价。这是让一人公司做到最轻的杠杆模型。

---

### [2026/03/23 09:16:00] 🤖 Antigravity
**进展摘要：**
深度破解“沈阳线下路演”的防剽窃焦虑与 Pitch（路演）逻辑：
明确界定你对前领导的交付物绝对不是“教老油条做业务”，而是**“帮大区总把不可控的人力外包，转换成永不疲倦的 AI 算力”**。大老板精通业务流转，但绝没有几十、上百个小时去学 Vibe Coding、调优 Prompt 格式、修补大模型幻觉、对接 MCP 和 API。
我们卖的根本不是思路，而是直接帮他们越过代码天堑的“时间、试错成本与即插即用的 AI 工业极客成品”。至此，微咨询的 PMF 和护城河彻底跑通。

---

### [2026/03/23 09:21:00] 🤖 Antigravity
**进展摘要：**
敲定沈阳之行的“共创客户（Beta Client）”落地打法：坚决不闭门造车，主动把前领导的盘口作为降维打击的第一块试验田。
明确了路演的实质是“找实验白鼠+造标杆案例”：1. 合作定调“产品共创（Pilot Program）”；2. 具体操作是把做好的 DEMO 直接接进他们某一组销售的废弃线索池进行清洗；3. 收费采取“0门槛部署 + 拿到实际转化 ROI 后再收尾款/换取背书”的破冰策略；4. 极大地降低了对方的防备心，彻底补齐了从“实验室代码”到“商业成品”的链路。

---

### [2026/03/23 09:35:00] 🤖 Antigravity
**进展摘要：**
大满贯级别的业务实战对齐！用户凭借硬核操盘经验，直接推翻了我在“AI圈”常见的“死单清洗”伪需求幻觉（小公司线索没丰富字段，死单就是拒接，AI 无法无中生有）。
精准提炼出针对“大厂高管下海做中小盘口”的绝杀痛点：老板极其怀念大厂的科学数字管控，但无力负担昂贵的辅助职能团队（质检、运管、培训）。我们的 AI 矩阵本质上是**老板免费的数字化职能天团**。
正式确立四大核心 Skill 落地研发线：
1. 线索智能分发与逼单关键节点流转。
2. 销售话术实战培训兵工厂（挂载 NotebookLM 知识库）。
3. **基于微信客情的非结构化流失预警**（王炸级：替代大厂系统数据监控，直接通过 OpenClaw/MCP 挂载微信聊天流，监控对客服务质量和跑单前兆）。这完美闭环了我们为何急需开发 MCP 接口的技术需求。

---

### [2026/03/23 09:45:00] 🤖 Antigravity
**进展摘要：**
结束长达一个多小时的高能早盘（Daily Focus）对齐。
正式生成并归档《2026-03-23-周一-DailyFocus.md》至本地 Obsidian 智库。
彻底宣告摒弃“脱离一线的极客盲想”，所有战略强行收敛到下沉商业世界的真实痛点：今日停止前端网站修改，全面转入**“反爬取非结构化数据 MCP Server”**及**“CLAUDE.md 跨端无极并发注入”**两大底层基建的开发，为路演造枪。

---

### [2026/03/23 09:56:00] 🤖 Antigravity
**进展摘要：**
紧急排雷并踩刹车：解答用户关于 OpenClaw 部署与算力成本的焦虑。
1. **叫停私有化硬刚部署**：大厂（飞书/微信）正在疯狂推官方灰度底座，现在普通人去私有化部署 OpenClaw 就是在当开源炮灰填坑。战略确立为：我们只做“只造图纸（JSON+Prompt）和外部零件（MCP）”，系统运行完全白嫖客户自带的官方底座。
2. **算力成本套利重组**：打破“开Plus会员跑Agent”的认知误区（UI会员不提供API高并发额度）。确立黄金双轨制：用最强最贵的 Claude 写代码（基建）；用极度便宜的大陆 DeepSeek API 去接入业务跑废单（干粗活）。彻底根治算力消耗焦虑。

---

## 2026-03-24

### B端视角网站整改 - 从头梳理战略定位

**背景**
启动个人门户网站，用Playwright从B端老板视角审查，发现：
1. Hero标题"告别业务盲盒"不符合"大厂实战+AI落地"叙事
2. 数字不统一（Hero说"千万"，PipelineTeaser说"1亿"）
3. 三曲线标签过于技术（SQL标签B端老板看不懂）
4. "客户激活"逻辑错误（AI不能自动发消息激活客户）
5. 导航结构问题
6. /capability页面内容单薄

---

### 核心认知更新

**关于人机协作的真实逻辑**
- 原理解（错误）：AI监控客户活跃 → 自动发消息激活
- 真实逻辑：AI分析沟通数据发现问题 → 输出策略建议 → 人执行触达 → AI实时分析 → 给出下一轮指导
- 关键：人是执行者，AI是顾问。不是"AI替代人"，而是"AI做大脑，人做手脚"

**关于"客户激活"的重新理解**
- 原说法（错误）："三个月没活跃的客户，AI自动发消息激活"
- 真实痛点：销售靠记忆记客户，靠猜判断时机。老客户什么时候有需求，等发现时已经丢单了
- 真实解决方案：AI发现老客户有需求信号，提醒销售去跟进

---

### 改动清单

#### 1. Hero区域 ✅

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| **标签** | OPC 机器代人架构师 | 前58同城大区运营操盘手 |
| **主标题** | 告别业务盲盒，拿回全盘掌控力。 | 年营收过亿的业务全链路，小微团队怎么Copy？ |
| **副标题** | 把大厂增长体系拆成「技能手册」... | 基于大厂增长体系的底层逻辑，提炼出核心技能。通过 OpenClaw 自动运转，人只负责成交环节的关键决策。 |
| **三条曲线标签** | WHERE cache='hit' / GROUP BY source_path / ANOMALY DETECTED | LEADS(商机) / CLOSED(成交) / RENEWAL(续费) |
| **三个能力卡片** | 全天候问题预警(99.7%) / 客户价值分级(3.2x) / 沉睡客户激活(+18%) | 获客-智能获客 / 跟进-AI跟进策略引擎 / 复购-客户价值守护 |
| **卡片描述** | 带假数字 | 功能性描述+标签（去掉假数字） |
| **按钮** | 预约15分钟漏斗诊断 / 查看增长案例与数据 | 已移除 |

#### 2. NAV导航 ✅

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| 导航项 | 核心战役 / 能力引擎 / Build in Public | Skill方案库 / 能力引擎 / Building Public |

#### 3. 首页移除TerminalLogList ✅

原因：极客向内容对B端转化无价值，分散注意力

#### 4. About区域 ✅

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| **主标题** | 大厂级基建底座 | 为什么选择我？ |
| **副标题** | 业务盘感与数据算法的双轴引擎... | 从互联网大厂运营操盘者，到AI技术落地实践者——用大厂经验 × AI技能，帮你复制这套增长全链路体系。 |
| **路由按钮** | Neverlol_Core / 启动全景控制台 | 查看完整能力档案 → / 了解我能帮你做什么 |
| **悬浮提示** | PRESS TO INITIALIZE SYSTEM | 基于亿级盘口实战沉淀 |

#### 5. /capability页面 ✅

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| **标签** | System Architecture | Neverlol Capability Profile |
| **主标题** | 精益运营增长引擎 | 亿级盘口背后的运营能力 |
| **副标题** | 拒绝纸上谈兵的空洞理念... | 这套框架不是理论，是从58同城亿级盘口实战中提炼出来的。 |
| **新增** | 无 | 能力引言模块（从58同城大区运营操盘手，到AI技术落地实践者） |
| **新增** | 无 | 到/campaigns的引导链接 |

#### 6. /cases页面 ✅

| 项目 | 改动前 | 改动后 |
|------|--------|--------|
| **标题** | 核心战役库 | Skill方案库 |

---

### 当前首页动线

```
Hero（年营收亿级 + 3个能力卡片：获客/跟进/复购）
    ↓
PipelineTeaser（4步闭环 + CTA → /campaigns）
    ↓
Demo Section（销售全链路人机协作）
    ↓
Portfolio（Skill方案库）
    ↓
About（为什么选择我？ + CTA → /capability）
    ↓
ConsultingCTA（收口转化）

Header导航：
Skill方案库 | 能力引擎 | Build in Public
```

---

### 教训

**双写规则执行失误**：
- CLAUDE.md明确规定：每次改动必须双写到本地DEV_JOURNAL和Global_DEV_JOURNAL
- 今天整天的改动完全忘记执行双写
- 这是严重的流程违规，以后每次改动必须立即同步

---

## [2026-03-24 16:30] 首页板块标题样式统一

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-24
> **背景**：首页各板块标题样式不统一（拼接感严重），需要统一设计语言

### 统一设计规范

| 元素 | 统一样式 |
|------|---------|
| **顶部标签** | 脉冲点 + `px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md` + 小号大写字体 |
| **主标题** | 双行结构，强调色（蓝色）突出关键词 |
| **副标题** | `text-gray-400` + `max-w-xl mx-auto`（居中）或 `max-w-2xl`（左对齐） |

### 具体改动

1. **Demo Section** (`page.tsx`)
   - 改动前：链接按钮样式 + 无统一标签
   - 改动后：添加脉冲点顶部标签 + 标题副标题样式统一
   - 移除未使用的 `Link` 和 `ArrowRight` import

2. **Portfolio** (`Portfolio.tsx`)
   - 改动前：`ShieldCheck` 图标 + `text-[#245fff] text-xs font-bold tracking-widest uppercase`
   - 改动后：脉冲点 + 小号大写字体 `text-[10px] font-mono text-gray-400 tracking-wider uppercase`
   - 主标题强调色从渐变改为纯蓝色 `text-blue-500`
   - 移除未使用的 `ShieldCheck` import

3. **About** (`About.tsx`)
   - 改动前：分隔线装饰 `span className="h-px w-6 bg-[#245fff]/80 block"`
   - 改动后：脉冲点 + 小号大写字体
   - 移除未使用的 `Terminal` import

4. **PipelineTeaser** (`PipelineTeaser.tsx`)
   - 改动前：主标题第二行纯白色
   - 改动后：蓝色强调 "4 步" → `<span className="text-blue-500">4 步</span>`
   - 副标题颜色 `text-gray-500` → `text-gray-400`

---

## [2026-03-24 17:00] 标题字体大小与标签框体统一

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-24
> **背景**：各板块主副标题大小不统一，标签框体大小不一致

### 统一设计规范

| 元素 | 统一样式 |
|------|---------|
| **顶部标签** | `w-fit` + `mx-auto` + `px-3 py-1` + 脉冲点 |
| **主标题** | `text-3xl md:text-4xl font-bold` |
| **副标题** | `text-sm md:text-base` + `text-gray-400` |

### 具体改动

1. **Demo Section** (`page.tsx`)
   - 添加 `w-fit mx-auto` 到标签
   - 主标题 `text-2xl md:text-3xl` → `text-3xl md:text-4xl`
   - 副标题 `text-sm` → `text-sm md:text-base`

2. **About** (`About.tsx`)
   - 添加 `w-fit mx-auto` 到标签
   - 主标题 `text-4xl md:text-6xl` → `text-3xl md:text-4xl`
   - 副标题 `text-base md:text-lg` → `text-sm md:text-base`

3. **Portfolio** (`Portfolio.tsx`)
   - 主标题 `text-3xl md:text-5xl` → `text-3xl md:text-4xl`
   - 副标题 `text-base md:text-lg` → `text-sm md:text-base`

4. **PipelineTeaser** (`PipelineTeaser.tsx`)
   - 副标题 `text-gray-500` → `text-gray-400`
   - 副标题 `text-sm` → `text-sm md:text-base`

---

## [2026-03-24 17:30] 标题层级重新设计

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-24
> **背景**：统一大小后各 section 标题不够突出，层级不分明

### 新的字体层级体系

| 元素 | 样式 | 说明 |
|------|------|------|
| **Hero 标题** | `text-3xl md:text-5xl lg:text-6xl` | 最大，入口焦点 |
| **Section 标题** | `text-4xl md:text-5xl` | 各 section 通用 |
| **Section 副标题** | `text-base md:text-lg` | |
| **Section 标签** | `text-xs tracking-widest` | 统一规格 |
| **Portfolio 卡片 metric** | `text-3xl` / `text-5xl md:text-7xl` | 保持大数字风格 |
| **Portfolio 卡片标题** | `text-lg` / `text-2xl md:text-3xl` | |

### 具体改动

1. **Hero** (`Hero.tsx`)
   - 标签 `text-[10px]` → `text-xs`

2. **PipelineTeaser** (`PipelineTeaser.tsx`)
   - 标签添加 `w-fit mx-auto justify-center`
   - 标签 `text-[10px]` → `text-xs tracking-widest`
   - 主标题 `text-3xl md:text-4xl` → `text-4xl md:text-5xl`

3. **Demo Section** (`page.tsx`)
   - 标签 `text-[10px]` → `text-xs tracking-widest`
   - 主标题 `text-3xl md:text-4xl` → `text-4xl md:text-5xl`
   - 副标题 `text-sm` → `text-base md:text-lg`

4. **Portfolio** (`Portfolio.tsx`)
   - 标签 `text-[10px]` → `text-xs tracking-widest`
   - 主标题 `text-3xl md:text-4xl` → `text-4xl md:text-5xl`
   - 副标题 `text-sm md:text-base` → `text-base md:text-lg`
   - 卡片 metric: 恢复原尺寸 `text-5xl md:text-7xl` / `text-3xl`
   - 卡片大标题: 恢复原尺寸 `text-2xl md:text-3xl`

5. **About** (`About.tsx`)
   - 标签 `text-[10px]` → `text-xs tracking-widest`
   - 主标题 `text-3xl md:text-4xl` → `text-4xl md:text-5xl`
   - 副标题 `text-sm md:text-base` → `text-base md:text-lg`

---

## [2026-03-24 18:00] 标题重点突出与副标题换行优化

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-24
> **背景**：标题没有突出重点，副标题换行不美观

### 具体改动

1. **Demo Section** (`page.tsx`)
   - 主标题"销售全链路人机协作" → "销售全链路<span className="text-blue-500">人机协作</span>"
   - 副标题添加换行：md 断点下在"协作，"后换行

2. **PipelineTeaser** (`PipelineTeaser.tsx`)
   - 副标题添加换行：md 断点下在句号后换行，分两行显示

3. **Portfolio** (`Portfolio.tsx`)
   - 副标题添加换行：md 断点下在"系统，"后换行，分三行显示

---

## [2026-03-24 18:30] Header 导航菜单样式优化

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-24
> **背景**：导航菜单字体普通，不符合整体极客调性

### 具体改动

1. **Header** (`Header.tsx`)
   - 字体：`text-sm` → `text-xs font-mono tracking-wider`
   - 颜色：`text-[#8b949e]` → `text-gray-500 hover:text-gray-200`
   - 添加左侧脉冲点：灰色 → 蓝色 hover
   - 添加悬浮效果：`bg-white/5` + `border-white/10`
   - 间距：`gap-6` → `gap-1`，更紧凑

---
## [2026-03-25 10:45] 🎯 Obsidian/Firebase 架构迁移与 UI 极简重塑

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-25
> **背景**：完成从 Supabase 到 Obsidian (SSOT) + Firebase 的架构切换，并对全站 UI 进行极简主义重塑。

### 1. 沟通记录 (The Collision)

**[2026-03-25 10:45:12]**
> 用户：显示的（开始核对详情页样式）
> 🤖 摘要：解决详情页日期 ISO 字符串标准化问题，切开冗余 H1 标题标题。

**[2026-03-25 13:40:15]**
> 用户：刚才设置Shell commands，直接给我clash verge干崩了！！！
> 🤖 摘要：深度复盘 Obsidian 插件引发的网络风暴，定位 Clash Verge 内核连接池溢出问题。
> 🚨 红线：确立“低频同步+手动确认”的开发基建红线。

**[2026-03-25 14:15:00]**
> 用户：给我做成一个可以全局调用的 skill... 我确认预览效果 OK 就直接同步。
> 🤖 架构：封装 `portfolio-sync` 全局 Skill。逻辑：`git pull` -> `scripts/publish-nl.mjs` -> `http://localhost:3000` 预览 -> `firebase deploy`。

**[2026-03-25 15:30:22]**
> 用户：我感觉你这个逻辑也不叫预览了...
> 🤖 对齐：明确 SSOT 架构下的“预览”定义：本地 Next.js 环境确认 = 预览；Firebase 线上环境 = 发布。

**[2026-03-25 23:43:16]**
> 用户：http://localhost:3000/log/... 提示日志不存在。
> 🤖 修复：修正预览路由匹配逻辑，优先读取 YAML `id` 属性以解决 Slug 不匹配问题。

### 2. 下步动作 (Next Steps)
- 已完成 `daily-focus` 技能进化，成功合入 DBS (dontbesilent) 的“战略消解”逻辑。
- 明晨计划：启动基于 DBS 逻辑的“业务导弹”封装讨论。

---

## [2026-03-26 21:26] 🤖 Codex 首页叙事重构与解决方案页落地

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-26
> **背景**：根据 2026-03-26 21:26:02 的提交 `bbd4276` 补录昨天对个人网站的实际改动。核心目标是把站点叙事从“抽象展示”推进到“定制 Skill + OpenClaw 部署 + 周期优化”的可交付路径，同时拉开“业务沙盘 / 解决方案 / 首页 Demo”的层次关系。

### 具体改动

1. **首页 Hero 改写为明确交付模型**
   - `src/components/Hero.tsx`
   - 主标题从“小微团队怎么 Copy 亿级业务全链路”切换为“把销售运营经验封成 Skill，部署到你自己的 OpenClaw”
   - 副标题补充人机边界：AI 负责后台诊断、预警、路由与任务生成，人负责触达、谈判、成交和续费挽回
   - 底部三张能力卡同步收敛为交付 01/02/03：`定制 Skill`、`部署 OpenClaw`、`周期优化`

2. **新增独立 `/solutions` 页面，完整讲清人机协同边界**
   - `src/app/solutions/page.tsx`
   - 新建 8 个业务阶段拆分，从“线索进入与整理”一路到“复盘与规则迭代”
   - 每个阶段都拆成 `AI 负责 / 人负责`，并标注 `AI 可完全承担 / 建议人机协同 / 必须人工主导`
   - 额外补充三类边界卡片：`AI 更适合承担`、`销售必须承担`、`最适合人机协同`

3. **首页新增合作方式模块，明确不是外包而是系统交付**
   - `src/components/CooperationProcess.tsx`
   - `src/app/page.tsx`
   - 首页在 Portfolio 后加入 `CooperationProcess`
   - 合作路径固定为三阶段：`业务 Skill 审计` → `定制 Skill + 部署 OpenClaw` → `固定周期升级优化`

4. **导航体系重构，补齐核心转化路径**
   - `src/constants/index.ts`
   - 导航从“Skill方案库 / 能力引擎”扩展为：
     - `解决方案` → `/solutions`
     - `业务沙盘` → `/campaigns`
     - `Skill案例` → `/#portfolio`
     - `合作方式` → `/#cooperation`
     - `关于我` → `/#about`

5. **PipelineTeaser 与 /campaigns 页面重新分工**
   - `src/components/PipelineTeaser.tsx`
   - `src/app/campaigns/page.tsx`
   - PipelineTeaser 改成“先进入 58 全业务沙盘，再回首页看 Skill 与 Demo”
   - `/campaigns` 页面不再强调抽象 Skill 概念本身，而是突出“方法论来源”和真实业务沙盘
   - 沙盘后的 CTA 改成双分流：先去 `/solutions` 看全链路方案，也可以回首页看 Demo

6. **Portfolio 由“过往战绩”收束为“首批业务 Skill 案例”**
   - `src/components/Portfolio.tsx`
   - 四张卡片重命名为：`商机质检 Skill`、`流失预警 Skill`、`归因诊断 Skill`、`线索工厂 Skill`
   - 每张卡都按 `获客 / 筛选 / 跟进 / 复购` 映射到漏斗节点
   - 右下角 CTA 从“查阅全部 Skill 方案”调整为“查阅全部案例与原型”

7. **咨询 CTA 从“业务诊断”改成“Skill 审计申请”**
   - `src/components/ConsultingCTA.tsx`
   - 浮窗按钮改为“申请 Skill 方案沟通”
   - 弹窗问题改成三个更贴近交付切入点的选项：
     - `线索很多，但销售跟不动`
     - `商机推进慢，过程不可控`
     - `续费和流失没有预警机制`
   - 表单文案也同步改为“判断适合先落地哪 1 到 3 个 Skill，以及是否适合部署 OpenClaw”

### 关键代码/逻辑
```ts
export const NAV_ITEMS = [
  { label: "解决方案", href: "/solutions" },
  { label: "业务沙盘", href: "/campaigns" },
  { label: "Skill案例", href: "/#portfolio" },
  { label: "合作方式", href: "/#cooperation" },
  { label: "关于我", href: "/#about" },
  { label: "Build in Public", href: "/build-in-public" },
];
```

```ts
const STEPS = [
  { step: "阶段 01", title: "业务 Skill 审计" },
  { step: "阶段 02", title: "定制 Skill + 部署 OpenClaw" },
  { step: "阶段 03", title: "固定周期升级优化" },
];
```

### 错误与修复（如果有）
- 问题：昨天对话丢失，日志未按双写规则补录。
- 修复：依据 git 提交 `bbd4276` 反向还原改动，并同步补写本地 DEV_JOURNAL 与 Global DEV_JOURNAL。

---
*最后更新：2026-03-27 00:00*

---

## [2026-03-27 10:12] 🤖 Codex Demo 改造原则与定制化 Skill 封装战略同步

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-27
> **背景**：为避免后续上下文压缩导致站点改造方向跑偏，补录今日关于“首页 Demo 如何与首批 4 个 Skill 对齐”以及“对沈阳种子用户的真实交付方式”的关键决策。核心结论是：Demo 保留为理想化人机协同蓝图，4 个 Skill 作为第一批已封装节点嵌入其中；对外售卖的不是通用成熟流程，而是基于客户现有工作流和经验数据的定制化 Skill 封装服务。

### 具体改动

1. **锁定 Demo 的定位：蓝图，不是完整成品**
   - `src/components/HomepageSkillDemo.tsx`
   - 首页 `销售全链路人机协作 Demo` 继续承担“解释理想化人机协同工作流”的职责
   - 不再把当前 Demo 误读成“所有节点都已封装完成并能直接交付”
   - 后续改造方向：将节点划分为 `人工节点` / `已封装 Skill` / `可定制扩展节点`

2. **锁定 4 个真实 Skill 的站内角色：首批已封装节点**
   - 来源项目：`../19-skill开发`
   - 当前首批 Skill：
     - `crm-auto-fill`
     - `funnel-doctor`
     - `customer-profiler`
     - `renewal-watch`
   - 这 4 个 Skill 不等于完整工作流，而是理想蓝图中最先落地的关键模块

3. **明确 Demo 与 4 个 Skill 的映射关系**
   - 建议映射链路：
     - `销售首次触达` → 人工节点
     - `crm-auto-fill` → 将聊天/通话/拜访记录结构化
     - `funnel-doctor` → 诊断商机卡点、缺失字段、下一步动作
     - `销售推进/谈判` → 人工节点
     - `customer-profiler` → 客户分层、owner cadence、推荐动作
     - `renewal-watch` → 续费窗口、风险等级、优先级名单
     - `人工干预/续费挽回` → 人工节点
   - 其他如 `路由智能体`、`策略智能体`、`订单管理`、`生命周期监控` 等保留为后续可定制扩展能力，不应在当前阶段被包装成“已完成”

4. **锁定对沈阳种子用户的真实交付模型**
   - 不是“把我现成的 4 个 Skill 直接卖给客户”
   - 而是：
     - 先梳理客户当前工作流
     - 读取其业务案例数据、团队经验和判断规则
     - 结合我的大厂经验进行抽象与结构化
     - 将这些规则封进客户自己的 Skill 知识库
     - 再交由 OpenClaw 承接为自动化方案和人机协同工作流

5. **锁定网站叙事主轴：卖的是定制封装能力，不是标准化模板**
   - 首页 Demo：展示目标工作流蓝图
   - Portfolio：展示第一批已可落地的 Skill 模块
   - CooperationProcess：强调“工作流梳理 / 规则抽取 / Skill 封装 / OpenClaw 部署 / 周期优化”
   - 核心话术：不是把我的流程卖给你，而是把你已经验证过的业务经验，结合我的大厂抽象能力，封成你自己的 Skill 系统

### 关键代码/逻辑
```ts
const DEMO_POSITIONING = {
  role: "target-workflow-blueprint",
  shippedSkills: ["crm-auto-fill", "funnel-doctor", "customer-profiler", "renewal-watch"],
  principle: "show-blueprint-but-do-not-overclaim",
};
```

```ts
const DELIVERY_MODEL = [
  "梳理客户现有工作流",
  "提炼当地团队已验证的经验与规则",
  "结合大厂方法论抽象为 Skill 知识库",
  "交由 OpenClaw 部署为人机协同工作流",
];
```

### 错误与修复（如果有）
- 问题：如果只强调“4 个已封装 Skill”，网站会失去全链路蓝图价值；如果只保留理想化 Demo，又会产生过度承诺风险。
- 修复：确立“双层表达”原则。Demo 讲蓝图，Skill 卡讲当前可交付模块，合作流程讲定制封装方法。

---
*最后更新：2026-03-27 10:12*

---

## [2026-03-27 10:25] 🤖 Codex 首页 Demo 与 Skill 案例库第一轮改造落地

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-27
> **背景**：将刚刚锁定的战略真正落到页面层。目标是让首页 Demo、Skill 卡片、合作方式和详情页讲同一套话，不再出现“首页讲定制封装，点进去还是旧业务故事”的割裂。

### 具体改动

1. **首页 Demo 改成“蓝图层 + 已封装节点层”**
   - `src/components/HomepageSkillDemo.tsx`
   - 原 10 节点理想化流程收敛为 8 个蓝图节点
   - 节点类型明确区分：
     - `已封装 Skill`
     - `人工判断`
     - `可定制扩展`
   - 首批 4 个真实 Skill 正式嵌入 Demo：
     - `crm-auto-fill`
     - `funnel-doctor`
     - `customer-profiler`
     - `renewal-watch`
   - 底部状态栏明确提示：已封装 4 个核心 Skill，其余节点按客户业务访谈后定制

2. **首页 Demo 说明文案改写，去掉“即将替换为实际案例”的悬空说法**
   - `src/app/page.tsx`
   - 顶部提示改为：
     - 当前展示的是目标工作流蓝图
     - 首批已完成 4 个核心 Skill 封装
     - 其余节点将按客户真实流程定制
   - Demo 标题名同步改为 `销售运营人机协同蓝图`

3. **Portfolio 彻底替换成真实 4 个 Skill 模块**
   - `src/components/Portfolio.tsx`
   - 4 张卡从泛化能力名切换为真实 Skill 名：
     - `crm-auto-fill`
     - `funnel-doctor`
     - `customer-profiler`
     - `renewal-watch`
   - 每张卡的 metric / subtext / badges 全部改成首批已封装模块的真实职责
   - 卡片跳转从旧的业务类目切换为新的 `category/<skill-id>` 语义路由

4. **合作方式改成“先理解你们，再封装你们”**
   - `src/components/CooperationProcess.tsx`
   - 三阶段改写为：
     - `业务访谈与工作流梳理`
     - `规则抽取与 Skill 封装`
     - `OpenClaw 部署与周期优化`
   - 主标题改为“不是卖模板，而是把你团队已验证的经验封成 Skill 系统”

5. **Skill 详情页先完成第一轮重映射**
   - `src/app/category/[id]/page.tsx`
   - 旧 `activation / attribution / sales-enablement / lead-scoring` 叙事重写为 4 个真实 Skill 详情页
   - 每个详情页同步更新：
     - 痛点定义
     - 原型 Pipeline
     - 三步封装逻辑
     - 详情标题与说明
   - 增加旧路由别名映射，避免已有旧链接直接失效

6. **案例总页文案同步调整**
   - `src/app/cases/page.tsx`
   - 页面标题从“Skill方案库”调整为“案例与封装原型”
   - 副标题强调：这里展示的是业务案例、首批封装模块，以及后续可继续接入客户工作流的扩展原型

### 关键代码/逻辑
```ts
type NodeType = "skill" | "human" | "planned";

const CATEGORY_ALIASES: Record<string, string> = {
  activation: "funnel-doctor",
  "lead-scoring": "renewal-watch",
  attribution: "customer-profiler",
  "sales-enablement": "crm-auto-fill",
};
```

```ts
const shippedSkills = [
  "crm-auto-fill",
  "funnel-doctor",
  "customer-profiler",
  "renewal-watch",
];
```

### 错误与修复（如果有）
- 问题：Portfolio 卡片已改成新 Skill，但旧详情页仍在讲旧业务类目，会导致用户点击后认知断裂。
- 修复：同步重写 `category/[id]` 的叙事和 Pipeline，并增加旧路由别名兼容层。
- 问题：本次改动涉及的文件需要单独确认 lint 状态，避免把旧仓库里的历史错误误判为本轮问题。
- 修复：对本次改动文件单独执行 `npx eslint` 校验，结果通过。

---
*最后更新：2026-03-27 10:25*

---

## [2026-03-27 13:36] 🤖 Codex Demo 视觉层级强化与财税场景文案收口

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-27
> **背景**：在第一轮结构性改造完成后，继续往“看一眼就懂”和“更贴近沈阳财税团队”的方向压实，避免页面虽然结构正确，但视觉上仍不够一眼可读，文案上也不够贴近真实客户语境。

### 具体改动

1. **首页 Demo 新增图例与节点统计**
   - `src/components/HomepageSkillDemo.tsx`
   - 在左侧蓝图区域新增“当前状态”信息块
   - 明确展示：
     - `4 个已封装 Skill`
     - `3 个人工判断`
     - `1 个可定制扩展入口`
   - 视觉上把 `已封装 Skill / 人工判断 / 可定制扩展` 三类状态先讲清楚，降低首次阅读门槛

2. **首页 Demo 细节继续收口**
   - `src/components/HomepageSkillDemo.tsx`
   - OpenClaw 顶部说明改成 `目标工作流蓝图`
   - 底部收口再次强调：其余节点将在客户业务访谈后按真实流程定制
   - 交互入口从原生 `<a>` 切到 `Link`，并完成本轮改动文件的 lint 通过校验

3. **Skill 详情页文案更贴近财税代理团队**
   - `src/app/category/[id]/page.tsx`
   - 4 个 Skill 的痛点说明加入更具体的财税语境：
     - 微信里咨询做账 / 报税 / 注销 / 工商变更
     - 套餐报价、决策人确认、账期续费窗口
     - 代账、工商、社保、注销等交叉销售维护节奏
   - 详情页描述从抽象业务词汇进一步压向“财税代理团队能听懂”的表达

4. **Skill 详情页增加“首批已封装节点”识别**
   - `src/app/category/[id]/page.tsx`
   - 在详情页标题区加入 `首批已封装节点` 标签
   - 让用户从进入详情页第一眼就知道：这里展示的是已经做完第一轮封装的模块，而不是纯概念页面

### 关键代码/逻辑
```ts
const CURRENT_STATUS = {
  shipped: 4,
  human: 3,
  planned: 1,
};
```

```ts
const POSITIONING = [
  "先让用户看懂蓝图层级",
  "再让财税团队代入自己的工作流",
  "最后再解释这不是模板，而是可继续定制的封装节点",
];
```

### 错误与修复（如果有）
- 问题：第一轮改造后结构已经正确，但 Demo 视觉层级还不够一眼读懂，Skill 详情页也偏“通用业务表达”。
- 修复：补充图例与数量统计，并把 4 个 Skill 的痛点和说明压向财税代理/代账业务的真实语境。

---
*最后更新：2026-03-27 13:36*

---

## [2026-03-27 13:58] 🤖 Codex 第一性原理纠偏：系统定位、付费逻辑与文案红线锁定

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-27
> **背景**：对站点当前叙事再次做原则级纠偏。核心问题不是“技术讲没讲清”，而是“有没有命中老板最底层的业务命脉”。本次结论会作为后续所有开发和文案的硬约束。

### 具体改动

1. **修正文案红线：不再把 4 个模块说成测试中的第一轮封装**
   - 对外避免使用：
     - `已完成第一轮封装`
     - `测试阶段`
     - `还在验证`
   - 推荐表达：
     - `当前优先落地的 4 个核心模块`
     - `当前先从 4 个高价值节点切入`
     - `当前已上线的 4 个关键模块`

2. **锁定系统本质：不是“中小团队专用”，而是 AI 时代的人机协同工作系统**
   - 大团队同样适用，只是大团队通常有自己的技术和流程团队去做
   - 当前服务重销售的中小团队，只是因为他们缺少“把经验抽象成系统”的能力，而不是因为系统只适合他们

3. **锁定系统与传统工具的区别**
   - 拨号系统 / CRM / 飞书：主要解决 `记录`、`触达`、`协同`
   - 这套系统：主要解决 `判断`、`优先级`、`管理`
   - 本质上是叠加在现有流程上的 `判断层 / 管理层`
   - 不是让客户推翻重来，而是让后台先变聪明

4. **锁定老板愿意付费的第一性原理**
   - 老板不会为“更先进”买单，而是为“更接近业务命脉”买单
   - 需要优先命中的命脉：
     - 线索有没有被浪费
     - 商机有没有卡死在中间
     - 老客户有没有在流失前被发现
     - 团队是不是过度依赖老员工经验
     - 主管是不是天天靠盯、靠吼、靠追问

5. **锁定落地原则：系统适应团队，而不是团队适应系统**
   - 前线不应因为系统增加过多额外动作
   - 不要求客户先换掉原有拨号系统、聊天工具或 CRM
   - 优先从后台接管：
     - 记录整理
     - 卡点诊断
     - 客户分层
     - 续费预警
   - 人只在关键节点介入

6. **锁定页面叙事顺序**
   - 先讲业务命脉
   - 再讲判断层价值
   - 最后讲 Skill 和 OpenClaw 如何承接技术实现
   - 后续首页文案、Demo 文案、CTA 文案都必须按这个顺序重写

### 关键代码/逻辑
```ts
const NARRATIVE_ORDER = [
  "业务命脉",
  "判断层价值",
  "Skill / OpenClaw 技术承接",
];
```

```ts
const WHY_BUY = [
  "少浪费线索",
  "少漏掉成交机会",
  "少靠主管人肉追进度",
  "少依赖老员工经验",
  "更早发现流失风险",
];
```

### 错误与修复（如果有）
- 问题：当前站点虽然已经在讲“Skill + OpenClaw”，但容易让老板理解为“又一个新系统”，而不是“叠加在现有流程上的判断层”。
- 修复：明确后续所有文案和页面设计必须先回答“为什么值得推、为什么值得花钱、为什么能低阻力落地”，再解释技术承接。

---
*最后更新：2026-03-27 13:58*

---

## [2026-03-27 14:42] 🤖 Codex 整站页面职责图与接地气文案红线固化

> **项目**：[09-个人门户网站/my-ai-portfolio]
> **日期**：2026-03-27
> **背景**：上午和中午已经把系统定位、付费逻辑和页面顺序纠偏了一轮，但还缺一层真正能约束后续文案开发的“销售语言红线”。本次补的是页面职责与表达方式，不是技术实现。

### 具体改动

1. **锁定整站页面职责，避免每个页面都在重复讲同一件事**
   - 首页：负责转化，先讲老板最痛的业务命脉，不先炫技术
   - `solutions`：负责讲清楚这套系统在全链路里帮团队接走了哪些后台工作，以及人和 AI 怎么配合
   - `campaigns`：负责证明这套方法不是空想，而是来自真实复杂业务的实战经验
   - `capability`：负责证明我不是只能做原型，而是能持续优化、持续补规则、持续调参
   - `category/[id]`：负责让客户看到“如果先从一个痛点切进去，会怎么落地”

2. **锁定首页新的销售顺序**
   - 先讲老板最怕什么：线索浪费、商机卡死、客户流失、主管天天盯、团队太依赖老员工
   - 再讲系统具体帮他接走哪些事：盯线索、看卡点、抓风险、推下一步动作
   - 最后再讲这些事情是怎么通过 Skill 和 OpenClaw 落地的
   - 结论：首页要先打“值不值买”，再补“凭什么信”

3. **锁定对外文案红线：禁止使用专业术语和互联网黑话**
   - 不要对外说：
     - `判断层`
     - `管理层`
     - `路由`
     - `节点`
     - `承接层`
   - 这些词可以作为内部工作词，但不能直接出现在销售文案里
   - 原则：传统 B 端老板不需要“翻译”就能明白网站在卖什么

4. **锁定表达方式：必须足够接地气**
   - 每句话都要尽量说人话，不讲抽象概念
   - 每段文案都要直接对应老板关心的结果：
     - 能不能少漏单
     - 能不能少浪费线索
     - 能不能少靠主管盯
     - 能不能让老员工经验被复制
     - 能不能让团队更容易扩大
   - 后续任何文案，如果更像“业内人讲给业内人听”，就说明方向偏了

### 关键代码/逻辑
```ts
const PAGE_JOBS = [
  "首页先转化",
  "solutions 讲清怎么配合",
  "campaigns 证明方法来源",
  "capability 证明长期优化能力",
];
```

```ts
const COPY_RULES = [
  "不用术语",
  "不用黑话",
  "一句话只说一件事",
  "先讲痛点，再讲结果",
];
```

### 错误与修复（如果有）
- 问题：前面虽然已经纠偏到“先讲业务命脉”，但文案层仍然容易回到“术语正确、销售不接地气”的表达。
- 修复：正式把“页面职责图 + 销售语言红线”写进项目记忆，后续页面改造一律按“传统老板直接听懂”的标准执行。

---
*最后更新：2026-03-27 14:42*
