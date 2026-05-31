# Demo：千人千面个性化

对应章节：[千人千面个性化](../../index.html#ch-practice-03-personalize)

## 前置
- Python 3.12+, OpenAI API Key

## 实验内容
1. 构建 UserProfile 用户画像
2. 用 Personalizer 生成个性化营销内容
3. 对比不同画像的生成结果差异

## 验收
- 不同画像生成的内容风格不同
- 用户兴趣和购买历史被引用
- 偏好风格（concise/detailed）生效

核心文件：`personalizer.py`
