"""
abc
"""
import json
import re
from collections import Counter

# JSON 파일에서 데이터 읽기
with open("./src/utils/data/job_data.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

# "recrtTitle" 키의 값을 추출하고 전처리
keywords = [re.sub(r'[^\w\s]', '', item["recrtTitle"].lower()) for item in data]

# 단어 단위로 분할
all_words = [word for keyword in keywords for word in keyword.split()]

# 각 단어의 빈도수 계산
word_counts = Counter(all_words)

# 빈도수가 높은 순으로 정렬
sorted_word_counts = word_counts.most_common()

# 결과 출력
for word, count in sorted_word_counts:
    print(f"{word}: {count} 회")
