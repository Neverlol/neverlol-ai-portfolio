-- Sample content for logs about YouTube weekly upload consistency

-- First, let's insert a new log entry
INSERT INTO evolution_logs (
  title,
  type,
  date,
  tags
) VALUES (
  '如何在 YouTube 保持周更节奏',
  'learn',
  '2024-01-15',
  ARRAY['YouTube', '内容创作', '时间管理']
);

-- Now update the markdown_content for the newly created log
UPDATE evolution_logs
SET markdown_content = e'## 为什么要周更？

在 YouTube 创作，周更是一个很重要的门槛。过了这个坎，算法会开始推荐你的内容，观众也会形成稳定的预期。

> "成功不是偶尔的成功，而是持续的输出。" —— 这是我这一年最大的感悟。

## 我是怎么做到的

### 1. 建立素材库

不是等灵感来了再创作，而是提前准备好素材库：

1. 随时记录想法和选题
2. 定期收集行业热点
3. 建立自己的素材模板

### 2. 批量创作

把创作流程拆解：

- 周一：选题确认
- 周二：脚本撰写
- 周三：录制
- 周四：剪辑
- 周五：发布和复盘

### 3. 设置缓冲库存

永远保持 2-3 期的库存，这样突发情况也不会断更。

## 关键心态

不要追求每一期都完美，**完成比完美更重要**。先跑通流程，再逐步优化。

---

如果你也想开始周更，从今天开始建立你的素材库吧！'
WHERE title = '如何在 YouTube 保持周更节奏';

-- Insert yt-dlp log with YouTube video
INSERT INTO evolution_logs (
  title,
  type,
  date,
  tags
) VALUES (
  'yt-dlp 技术实践',
  'project',
  '2024-01-20',
  ARRAY['Python', '视频下载', '工具']
);

-- Update with yt-dlp content including YouTube video
UPDATE evolution_logs
SET markdown_content = e'## yt-dlp 介绍

yt-dlp 是一个强大的命令行工具，用于从 YouTube 和其他视频网站下载视频和音频。

### 安装

```bash
pip install yt-dlp
```

### 基本用法

```bash
# 下载最高质量视频
yt-dlp "https://www.youtube.com/watch?v=IZq9gMyci9w"

# 下载音频并转换为 MP3
yt-dlp -x --audio-format mp3 "URL"

# 下载字幕
yt-dlp --write-subs "URL"
```

### 高级选项

- `--playlist-start`: 指定播放列表起始位置
- `--download-archive`: 记录已下载文件避免重复
- `--cookies`: 使用浏览器 Cookie 进行认证

## 技术视频

[youtube](https://www.youtube.com/watch?v=IZq9gMyci9w)

> 参考官方文档：https://github.com/yt-dlp/yt-dlp'
WHERE title = 'yt-dlp 技术实践';
