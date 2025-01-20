# import json
# import time
# import requests
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings

# @csrf_exempt
# def chat(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             # RunPod API 엔드포인트
#             run_url = "https://api.runpod.ai/v2/sl3opizvok8q6t/run"
            
#             headers = {
#                 "Content-Type": "application/json",
#                 "Authorization": f"Bearer {settings.RUNPOD_API_KEY}"
#             }
            
#             # RunPod에 초기 요청 보내기
#             response = requests.post(run_url, json={"input": data}, headers=headers)
            
#             if response.status_code == 200:
#                 initial_response = response.json()
#                 job_id = initial_response['id']
                
#                 # 작업 상태 확인 및 결과 대기
#                 status_url = f"https://api.runpod.ai/v2/sl3opizvok8q6t/status/{job_id}"
#                 max_attempts = 10
#                 attempt = 0
                
#                 while attempt < max_attempts:
#                     time.sleep(5)  # 5초 대기
#                     status_response = requests.get(status_url, headers=headers)
                    
#                     if status_response.status_code == 200:
#                         status_data = status_response.json()
#                         if status_data['status'] == 'COMPLETED':
#                             return JsonResponse(status_data)
#                         elif status_data['status'] == 'FAILED':
#                             return JsonResponse({"error": "RunPod 작업 실패"}, status=500)
                    
#                     attempt += 1
                
#                 return JsonResponse({"error": "RunPod 작업 시간 초과"}, status=504)
#             else:
#                 return JsonResponse({"error": "RunPod API 요청 실패"}, status=500)
        
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "잘못된 JSON 형식"}, status=400)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
    
#     return JsonResponse({"error": "POST 요청만 허용됩니다"}, status=405)

# import json
# import time
# import requests
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings
# from .models import ChatRequest, ChatResponse
# from .serializers import ChatRequestSerializer, ChatResponseSerializer

# @csrf_exempt
# def chat(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             # ChatRequest 모델에 사용자 입력 저장
#             chat_request = ChatRequest.objects.create(user_input=data.get('input', ''))
            
#             # RunPod API 엔드포인트
#             run_url = "https://api.runpod.ai/v2/56d8i662a1zn4j/run"
            
#             headers = {
#                 "Content-Type": "application/json",
#                 "Authorization": f"Bearer {settings.RUNPOD_API_KEY}"
#             }
            
#             # RunPod에 초기 요청 보내기
#             response = requests.post(run_url, json={"input": data}, headers=headers)
            
#             if response.status_code == 200:
#                 initial_response = response.json()
#                 job_id = initial_response['id']
                
#                 # 작업 상태 확인 및 결과 대기
#                 status_url = f"https://api.runpod.ai/v2/56d8i662a1zn4j/status/{job_id}"
#                 max_attempts = 10
#                 attempt = 0
                
#                 while attempt < max_attempts:
#                     time.sleep(5)  # 5초 대기
#                     status_response = requests.get(status_url, headers=headers)
                    
#                     if status_response.status_code == 200:
#                         status_data = status_response.json()
#                         if status_data['status'] == 'COMPLETED':
#                             # 응답 데이터 처리
#                             output = status_data.get('output', {})
#                             processed_response = {
#                                 'message': output.get('message', ''),
#                                 'status': output.get('status', ''),
#                                 'input': output.get('data', {}).get('input', '')
#                             }
                            
#                             # ChatResponse 모델에 처리된 응답 저장
#                             chat_response = ChatResponse.objects.create(
#                                 request=chat_request,
#                                 response_text=json.dumps(processed_response)
#                             )
                            
#                             return JsonResponse(processed_response)
#                         elif status_data['status'] == 'FAILED':
#                             return JsonResponse({"error": "RunPod 작업 실패"}, status=500)
                    
#                     attempt += 1
                
#                 return JsonResponse({"error": "RunPod 작업 시간 초과"}, status=504)
#             else:
#                 return JsonResponse({"error": "RunPod API 요청 실패"}, status=500)
        
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "잘못된 JSON 형식"}, status=400)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
    
#     return JsonResponse({"error": "POST 요청만 허용됩니다"}, status=405)



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY)

@csrf_exempt
def chat(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('input', '')

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_input}
                ]
            )

            ai_response = response.choices[0].message.content

            return JsonResponse({
                "message": ai_response
            })

        except Exception as e:
            return JsonResponse({
                "message": f"Error: {str(e)}"
            }, status=500)

    return JsonResponse({"message": "Invalid request method"}, status=405)
