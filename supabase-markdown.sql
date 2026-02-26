-- ============================================
-- Add markdown_content column to tables
-- 在 Supabase SQL Editor 中执行
-- ============================================

-- 为 projects 表添加 markdown_content 字段
ALTER TABLE projects ADD COLUMN IF NOT EXISTS markdown_content TEXT DEFAULT '';

-- 为 evolution_logs 表添加 markdown_content 字段
ALTER TABLE evolution_logs ADD COLUMN IF NOT EXISTS markdown_content TEXT DEFAULT '';

-- 更新部分案例添加 Markdown 内容示例
UPDATE projects SET markdown_content = '# Dynamic RFM 2.0 Agent 实战复盘

## 项目背景

传统 RFM 模型是静态的，每月跑一次表，无法实时捕捉「重要挽留客户」或「重要价值客户」的瞬时行为变化。

## 技术架构

```python
# 核心路由逻辑
def calculate_risk_score(customer):
    balance_trend = get_balance_trend(customer.id)
    login_freq = get_login_frequency(customer.id)

    # 8级运营的行业直觉阈值
    if balance_trend < -0.3 and login_freq < 3:
        return "high_risk"
    return "normal"
```

## 核心亮点

1. **实时监控**: T+0 分层自动更新
2. **智能预警**: 流失风险识别速度提升 30 倍
3. **自动触发**: 异常情况自动生成分析报告

## 商业价值

> 实现「T+0」的分层自动更新，流失风险客户的识别速度提升 30 倍以上。

### 量化指标

| 指标 | 传统方案 | AI 方案 | 提升 |
|------|---------|---------|------|
| 更新频率 | 每月 | 实时 | 30x |
| 识别速度 | T+30天 | T+0 | 30x |
| 人效提升 | - | +200% | - |

---
*更多技术细节欢迎交流探讨*
' WHERE id = 'dynamic-rfm';

UPDATE projects SET markdown_content = '# Industrial Coaching Copilot 行业知识库实践

## 业务痛点

销售在开发新行业（如家装、建材）时，缺乏专业领域知识，培训端产出行业手册周期长，经验萃取慢。

## 解决方案

构建基于 RAG 的行业百科系统：

### 核心功能

- **智能问答**: 利用 Agent 自动抓取 Top 销售的成功案例
- **实时检索**: 销售可在通话前实时检索相关话术
- **自动生成**: 自动生成各行业 FAQ 和异议处理话术

```typescript
// RAG 检索核心逻辑
const retrievedDocs = await vectorStore.similaritySearch(
  customer.industry,
  { topK: 5 }
);
```

## 落地效果

- 知识沉淀周期：**月级 → 天级**
- 新员工开单周期：缩短 40%

---
*持续迭代中，欢迎关注*' WHERE id = 'rag-copilot';

UPDATE projects SET markdown_content = '# Agentic BI Diagnoser 实战分享

## 背景

运营经理每周/月需花费大量时间对业绩波动进行原因挖掘，报告多为「事后总结」。

## 技术实现

打造 Autonomous BI Assistant，实现：

1. 实时监听核心经营指标
2. 自动执行多维下钻分析
3. 输出包含原因归因与改进动作建议的文字报告

```javascript
// 自动归因分析
async function diagnoseAnomaly(metrics) {
  const dimensions = await getRelevantDimensions(metrics);
  for (const dim of dimensions) {
    const impact = await calculateImpact(dim, metrics);
    if (impact > THRESHOLD) {
      await generateReport(dim, impact);
    }
  }
}
```

## 价值总结

从「T+1 做报表出报告」进化为「实时输出策略」
' WHERE id = 'bi-diagnoser';

-- 更新部分日志添加 Markdown 内容
UPDATE evolution_logs SET markdown_content = '# 重构 RFM 逻辑为多智能体协作

## 背景

今天完成了 RFM 核心逻辑的多智能体重构，将原本单一的判断逻辑拆分为多个专业 Agent 协作。

## 技术选型

- **LangGraph**: 多 Agent 编排
- **Claude API**: 智能决策
- **PostgreSQL**: 向量存储

## 核心收获

1. Agent 职责单一化，更容易维护
2. 可单独测试每个 Agent 的效果
3. 扩展性大幅提升

```python
# Agent 协作示例
workflow = StateGraph(AgentState)
workflow.add_node("monitor", monitor_agent)
workflow.add_node("analyze", analyze_agent)
workflow.add_node("action", action_agent)
```

## 下一步

- 接入更多数据源
- 优化 Agent 提示词
' WHERE id IN (SELECT id FROM evolution_logs WHERE title LIKE '%重构 RFM%' LIMIT 1);

UPDATE evolution_logs SET markdown_content = '# 完成 LangGraph 核心路由学习

## 学习历程

历时 3 天，终于把 LangGraph 的核心概念和应用场景摸清楚了。

## 核心概念

- **State**: 状态管理
- **Node**: 节点执行
- **Edge**: 流程控制
- **Conditional**: 条件分支

## 实践心得

LangGraph 非常适合构建复杂的多步骤工作流，特别是需要条件判断和循环的场景。

> 学习曲线较陡，但掌握后生产力提升显著。' WHERE id IN (SELECT id FROM evolution_logs WHERE title LIKE '%LangGraph%' LIMIT 1);
