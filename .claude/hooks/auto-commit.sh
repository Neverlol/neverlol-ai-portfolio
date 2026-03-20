#!/bin/bash
set -e

# Auto-commit hook - runs after file edits to auto-commit changes
# This prevents losing work by ensuring every change is committed

# Read tool information from stdin
tool_info=$(cat)

# Extract relevant data
tool_name=$(echo "$tool_info" | jq -r '.tool_name // empty')
file_path=$(echo "$tool_info" | jq -r '.tool_input.file_path // empty')
session_id=$(echo "$tool_info" | jq -r '.session_id # empty')
tool_result=$(echo "$tool_info" | jq -r '.tool_result # empty')

# Skip if not an edit tool
if [[ ! "$tool_name" =~ ^(Edit|MultiEdit|Write)$ ]] || [[ -z "$file_path" ]]; then
    exit 0
fi

# Skip markdown files (documentation)
if [[ "$file_path" =~ \.(md|markdown)$ ]]; then
    exit 0
fi

# Get project directory
project_dir="$CLAUDE_PROJECT_DIR"
cd "$project_dir"

# Check if this is a git repo
if [[ ! -d ".git" ]]; then
    exit 0
fi

# Get the relative path from project root
relative_path="${file_path#$project_dir/}"

# Extract filename for the commit message
filename=$(basename "$relative_path")

# Detect operation type
if echo "$tool_result" | jq -e . >/dev/null 2>&1; then
    # Check if it was a write (new file) or edit
    if echo "$tool_result" | jq -r '.created // "false"' | grep -q "true"; then
        operation="创建/更新"
    else
        operation="修改"
    fi
else
    operation="更新"
fi

# Generate commit message based on file type
case "$relative_path" in
    *.tsx|*.ts)
        if [[ "$filename" == *"page"* ]]; then
            component_type="页面"
        elif [[ "$filename" == *"component"* ]]; then
            component_type="组件"
        elif [[ "$filename" == *"hook"* ]]; then
            component_type="Hook"
        else
            component_type="TypeScript"
        fi
        commit_msg="chore: $operation $component_type $filename"
        ;;
    *.jsx|*.js)
        commit_msg="chore: $operation JS 文件 $filename"
        ;;
    *.css|*.scss|*.tailwind*)
        commit_msg="style: $operation 样式 $filename"
        ;;
    *.json)
        if [[ "$filename" == "package.json" ]]; then
            commit_msg="chore: 更新依赖配置"
        else
            commit_msg="chore: $operation 配置文件 $filename"
        fi
        ;;
    *.sql)
        commit_msg="chore: $operation 数据库脚本 $filename"
        ;;
    *)
        commit_msg="chore: $operation $filename"
        ;;
esac

# Add timestamp for uniqueness
timestamp=$(date +%Y%m%d-%H%M%S)

# Stage the file
git add "$relative_path" 2>/dev/null || exit 0

# Check if there are changes to commit
if git diff --cached --quiet; then
    exit 0
fi

# Commit with message
git commit -m "$commit_msg [$timestamp]" --no-verify 2>/dev/null || exit 0

# Exit cleanly
exit 0
