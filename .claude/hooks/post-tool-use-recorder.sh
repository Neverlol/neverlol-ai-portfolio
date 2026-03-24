#!/bin/bash
set -e

# ─── 读取 stdin (JSON: tool_use 信息) ───
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_use.tool // empty')
EXIT_CODE=$(echo "$INPUT" | jq -r '.tool_use.exit_code // 0')
ERROR_MSG=$(echo "$INPUT" | jq -r '.tool_use.error // empty')

[ -z "$TOOL_NAME" ] && exit 0

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
JOURNAL="$PROJECT_DIR/DEV_JOURNAL.md"
[ ! -f "$JOURNAL" ] && exit 0

IS_ERROR=false
if [ "$EXIT_CODE" != "0" ] && [ "$EXIT_CODE" != "null" ]; then
    IS_ERROR=true
fi
if [ -n "$ERROR_MSG" ] && [ "$ERROR_MSG" != "null" ]; then
    IS_ERROR=true
fi

SUGGESTION=""
TIMESTAMP=$(date '+%Y/%m/%d %H:%M:%S')

if [ "$IS_ERROR" = true ] && ([ "$TOOL_NAME" = "run_command" ] || [ "$TOOL_NAME" = "shell_execute" ]); then
    SUGGESTION="⚠️ 检测到命令执行失败。请在 DEV_JOURNAL.md 的 \"🚧 踩坑与 Debug 记录\" 中简要描述报错原因及你的排查思路。"

    # ─── P2: 自动将错误摘要写入 DEV_JOURNAL ───
    SECTION="## 🚧 踩坑与 Debug 记录"
    ERROR_SNIPPET=$(echo "$ERROR_MSG" | head -c 200)
    LOG_ENTRY=$'\n'"### [${TIMESTAMP}] ⚠️ 命令失败"$'\n'"> 工具: \`${TOOL_NAME}\`"$'\n'"> 错误: ${ERROR_SNIPPET}"$'\n'

    if grep -qF "$SECTION" "$JOURNAL"; then
        sed -i '' "s|${SECTION}|${SECTION}${LOG_ENTRY}|" "$JOURNAL" 2>/dev/null || \
        sed -i "s|${SECTION}|${SECTION}${LOG_ENTRY}|" "$JOURNAL" 2>/dev/null || \
        echo "$LOG_ENTRY" >> "$JOURNAL"
    else
        echo "$LOG_ENTRY" >> "$JOURNAL"
    fi

elif [ "$IS_ERROR" = false ] && ([ "$TOOL_NAME" = "replace_file_content" ] || [ "$TOOL_NAME" = "write_to_file" ] || [ "$TOOL_NAME" = "edit_file" ]); then
    SUGGESTION="✅ 检测到代码变更。如果这是一个重要的功能进展或 Bug 修复，请在 DEV_JOURNAL.md 的 \"✅ 终极解决方案与成果\" 中记录关键点。"
fi

if [ -n "$SUGGESTION" ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📝 BUILD-IN-PUBLIC 助手"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "$SUGGESTION"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
fi

exit 0
