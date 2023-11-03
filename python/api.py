"""
이 모듈은 API를 호출하여 데이터를 가져와 JSON 파일로 저장하는 예제 코드입니다.

작성자: Your Name
"""
import json
import os
import requests
import xmltodict


# API 엔드포인트 및 API 키
API_URL = "http://apis.data.go.kr/B552474/SenuriService/getJobList"
API_KEY = "wSTqSaG6MLJeM2pUEyMXp9TngT5qu7NsfM/5Ojl/2VMfbVFIC5hGHa4oFUJ9Ssq/11UGsxh6xXw9jENMNZKttQ=="

# API 호출에 필요한 매개변수 설정
params = {
    "ServiceKey": API_KEY,
    "numOfRows": 1000,
    "pageNo": 1,
}

# 타임아웃 설정 (예: 10초)
TIMEOUT = 10

# API 호출 및 응답 받기
response = requests.get(API_URL, params=params, timeout=TIMEOUT)

# API 응답 데이터를 XML에서 JSON으로 변환
data_dict = xmltodict.parse(response.content)

# 필요한 데이터 항목 추출
items = data_dict["response"]["body"]["items"]["item"]
# JobID = items.jobId



DATA_FOLDER = "./src/utils/data"

# 폴더가 없는 경우, 생성s
if not os.path.exists(DATA_FOLDER):
    os.makedirs(DATA_FOLDER)

json_file_path = os.path.join(DATA_FOLDER, "job_data.json")
with open(json_file_path, "w", encoding="utf-8") as json_file:
    json.dump(items, json_file, ensure_ascii=False, indent=4)

print(f"데이터가 {json_file_path} 파일로 저장되었습니다.")




