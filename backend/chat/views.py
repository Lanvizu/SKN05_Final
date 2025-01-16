# import json
# import requests
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings

# @csrf_exempt
# def test(request):
#     if request.method == 'POST':
#         try:
#             # 요청 본문에서 JSON 데이터 파싱
#             data = json.loads(request.body)
            
#             # RunPod API 엔드포인트
#             url = "https://api.runpod.ai/v2/sl3opizvok8q6t/run"
            
#             # RunPod API 키 (settings.py에서 가져옴)
#             headers = {
#                 "Content-Type": "application/json",
#                 "Authorization": f"Bearer {settings.RUNPOD_API_KEY}"
#             }
            
#             # RunPod에 요청 보내기
#             response = requests.post(url, json={"input": data}, headers=headers)
            
#             # 응답 확인
#             if response.status_code == 200:
#                 return JsonResponse(response.json())
#             else:
#                 return JsonResponse({"error": "RunPod API 요청 실패"}, status=500)
        
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "잘못된 JSON 형식"}, status=400)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
    
#     return JsonResponse({"error": "POST 요청만 허용됩니다"}, status=405)


import json
import time
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt
def test(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # RunPod API 엔드포인트
            run_url = "https://api.runpod.ai/v2/sl3opizvok8q6t/run"
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {settings.RUNPOD_API_KEY}"
            }
            
            # RunPod에 초기 요청 보내기
            response = requests.post(run_url, json={"input": data}, headers=headers)
            
            if response.status_code == 200:
                initial_response = response.json()
                job_id = initial_response['id']
                
                # 작업 상태 확인 및 결과 대기
                status_url = f"https://api.runpod.ai/v2/sl3opizvok8q6t/status/{job_id}"
                max_attempts = 10
                attempt = 0
                
                while attempt < max_attempts:
                    time.sleep(5)  # 5초 대기
                    status_response = requests.get(status_url, headers=headers)
                    
                    if status_response.status_code == 200:
                        status_data = status_response.json()
                        if status_data['status'] == 'COMPLETED':
                            return JsonResponse(status_data)
                        elif status_data['status'] == 'FAILED':
                            return JsonResponse({"error": "RunPod 작업 실패"}, status=500)
                    
                    attempt += 1
                
                return JsonResponse({"error": "RunPod 작업 시간 초과"}, status=504)
            else:
                return JsonResponse({"error": "RunPod API 요청 실패"}, status=500)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "잘못된 JSON 형식"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "POST 요청만 허용됩니다"}, status=405)
