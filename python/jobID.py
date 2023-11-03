import json
import requests
import xmltodict
import time

# JSON 파일 경로 지정
DATA = "./src/utils/data/job_data.json"

# JSON 파일 읽기
with open(DATA, "r", encoding="utf-8") as file:
    data = json.load(file)

# "jobId" 값만 추출하여 배열로 만들기
job_ids = [item["jobId"] for item in data]

# API 요청 기본 URL
API_URL = "http://apis.data.go.kr/B552474/SenuriService/getJobInfo"

# 인증키 (여기에 본인의 인증키를 입력하세요)
API_KEY = "wSTqSaG6MLJeM2pUEyMXp9TngT5qu7NsfM/5Ojl/2VMfbVFIC5hGHa4oFUJ9Ssq/11UGsxh6xXw9jENMNZKttQ=="

# JSON 파일로 저장할 데이터를 담을 리스트
api_responses = []

# API 호출을 20개씩 나눠 실행
batch_size = 20
for i in range(0, len(job_ids), batch_size):
    batch_job_ids = job_ids[i:i+batch_size]
    
    for job_id in batch_job_ids:
        # API 요청을 보낼 URL 생성
        request_url = f"{API_URL}?ServiceKey={API_KEY}&id={job_id}"

        # API 요청 보내기
        response = requests.get(request_url, timeout=600)

        # API 응답 확인
        if response.status_code == 200:
            # XML 데이터를 JSON으로 변환
            xml_data = response.text
            data_dict = xmltodict.parse(xml_data)
            info = data_dict["response"]["body"]["items"]["item"]
            api_responses.append(info)
        else:
            print(f"API 요청 오류: {response.status_code}")

    # 각 배치가 끝날 때 3초 대기
    print("20개완3초대기")
    time.sleep(3)

# JSON 파일로 저장
output_file_path = "./src/utils/data/api_responses.json"

with open(output_file_path, "w", encoding="utf-8") as output_file:
    json.dump(api_responses, output_file, ensure_ascii=False, indent=4)

print(f"API 응답 데이터를 {output_file_path}에 저장했습니다.")
