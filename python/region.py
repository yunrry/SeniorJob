"""
작성자: Your Name
"""
import json

# JSON 파일 경로 지정
DATA = "./src/utils/data/job_data.json"  # JSON 파일 경로를 실제 파일 경로로 바꿔주세요

# JSON 파일 읽기
with open(DATA, "r", encoding="utf-8") as file:
    data = json.load(file)   
 

dosi = "서울"
# "workPlcNm" 값에 "제주"를 포함하는 아이템 찾기
items_with_dosi = [item for item in data if dosi in item.get("workPlcNm", "") and "장애" in item.get("recrtTitle", "")]
# items_with_dosi = [item for item in data if dosi in item.get("workPlcNm", "") and "미화" not in item.get("recrtTitle", "")and "청소" not in item.get("recrtTitle", "")]

home_working= [item for item in data if "재택" in item.get("recrtTitle", "") ]

# "workPlcNm" 필드에 "서울" 또는 "경기"가 들어간 아이템을 찾습니다.


# 찾은 아이템 출력
if home_working:
    print("---------------------------------------------------------------------------------------------")
    for item in home_working:
        print(item)
    print(f"아이템 개수: {len(home_working)}")
    # items_with_check = [item for item in items_with_jeju if "접수중" in item.get("deadline", "")]
    # for item in items_with_check:
    #     print(item)
    # print(f"아이템 개수: {len(items_with_check)}")
else:
    print("제주를 포함하는 아이템을 찾지 못했습니다.")

if items_with_dosi:
    print("---------------------------------------------------------------------------------------------")
    for item in items_with_dosi:
        print(item)
    print(f"아이템 개수: {len(items_with_dosi)}")
else:
    print( dosi +"를 포함하는 아이템을 찾지 못했습니다.")