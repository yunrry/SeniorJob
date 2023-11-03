"""
"""
import json

# JSON 파일 경로 설정
api_responses_file = "./src/utils/data/api_responses.json"
job_data_file = "./src/utils/data/job_data.json"
merged_data_file = "./src/utils/data/margedData.json"

# JSON 파일 읽기
with open(api_responses_file, "r", encoding="utf-8") as file:
    api_responses = json.load(file)

with open(job_data_file, "r", encoding="utf-8") as file:
    job_data = json.load(file)

# jobId 값을 사용하여 데이터 머지
merged_data = []
for api_item in api_responses:
    api_job_id = api_item.get("jobId")
    for job_item in job_data:
        job_job_id = job_item.get("jobId")
        if api_job_id == job_job_id:
            merged_item = {**api_item, **job_item}
            merged_data.append(merged_item)

# Merged 데이터를 JSON 파일로 저장
with open(merged_data_file, "w", encoding="utf-8") as output_file:
    json.dump(merged_data, output_file, ensure_ascii=False, indent=4)

print(f"Merged data saved to {merged_data_file}")

# Firebase에 업로드 (Firebase SDK를 사용해야 함)
# 아래는 Firebase Realtime Database에 데이터 업로드하는 Python 예제 코드
# Firebase SDK를 사용하여 Firebase에 업로드하는 방법을 참조하세요
