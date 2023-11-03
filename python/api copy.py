"""
이 모듈은 API를 호출하여 데이터를 가져와 JSON 파일로 저장하는 예제 코드입니다.

작성자: Your Name
"""
import xml.etree.ElementTree as ET
import datetime
import requests

# API 엔드포인트 및 API 키
API_URL = "http://apis.data.go.kr/B552474/SenuriService/getJobList"
API_KEY = "wSTqSaG6MLJeM2pUEyMXp9TngT5qu7NsfM/5Ojl/2VMfbVFIC5hGHa4oFUJ9Ssq/11UGsxh6xXw9jENMNZKttQ=="

# 현재 날짜 가져오기
current_date = datetime.date.today()

# API 호출에 필요한 매개변수 설정
params = {
    "ServiceKey": API_KEY,
    "numOfRows": 500,
    "pageNo": 1,
}

# 측정 시작 시간
start_time = datetime.datetime.now()

# 타임아웃 설정 (예: 10초)
TIMEOUT = 10

# API 호출 및 응답 받기
response = requests.get(API_URL, params=params, timeout=TIMEOUT)

# 측정 종료 시간
end_time = datetime.datetime.now()

# 응답 시간 측정
response_time = end_time - start_time

# XML 파싱
root = ET.fromstring(response.text)

# "toDd" 키 값이 오늘 날짜 이후인 데이터 추출
filtered_data = []
data_count = 0  # 데이터 개수를 세는 변수

for item in root.iter("item"):
    toDd = item.find("toDd").text
    toDd_date = datetime.datetime.strptime(toDd, "%Y-%m-%d").date()
    
    if toDd_date >= current_date:
        data = {
            "toDd": toDd,
            # 다른 필요한 데이터 필드도 여기에 추가
        #             "acptMthd": "방문",
        # "deadline": "접수중",
        # "emplymShp": "CM0105",
        # "emplymShpNm": "CM0105",
        # "frDd": "20231020",
        # "jobId": "KJMK002310200004",
        # "oranNm": "엘림에스(주)",
        # "organYn": "N",
        # "recrtTitle": "청주 방서동 중흥S클래스아파트 외곽미화원 채용합니다.(장애인등록증 또는 장애인복지카드 소지자 우대)",
        # "stmId": "B",
        # "stmNm": "워크넷",
        # "toDd": "20231103",
        # "workPlc": "010200"
        }
        filtered_data.append(data)
        data_count += 1

# 총 시간 측정
total_time = datetime.datetime.now() - start_time

# 결과 출력
print("Response Time:", response_time)
print("Data Count:", data_count)
print("Total Time:", total_time)
