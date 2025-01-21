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

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings
# import json
# from openai import OpenAI

# client = OpenAI(api_key=settings.OPENAI_API_KEY)

# @csrf_exempt
# def chat(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             user_input = data.get('input', '')

#             response = client.chat.completions.create(
#                 model="gpt-3.5-turbo",
#                 messages=[
#                     {"role": "system", "content": "You are a helpful assistant."},
#                     {"role": "user", "content": user_input}
#                 ]
#             )

#             ai_response = response.choices[0].message.content

#             return JsonResponse({
#                 "message": ai_response
#             })

#         except Exception as e:
#             return JsonResponse({
#                 "message": f"Error: {str(e)}"
#             }, status=500)

#     return JsonResponse({"message": "Invalid request method"}, status=405)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ChatRoom, ChatMessage
from .serializers import ChatRoomSerializer, ChatMessageSerializer
from django.conf import settings
from openai import OpenAI
from config.authentication import CookieJWTAuthentication

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class ChatRoomListView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chat_rooms = ChatRoom.objects.filter(user=request.user).order_by('-created_at')
        chat_rooms_data = []

        for room in chat_rooms:
            first_user_message = ChatMessage.objects.filter(room=room, is_user=True).order_by('created_at').first()
            first_question = first_user_message.content if first_user_message else None

            room_data = {
                'id': room.id,
                'name': room.name,
                'created_at': room.created_at,
                'first_question': first_question
            }
            chat_rooms_data.append(room_data)

        return Response(chat_rooms_data)

class ChatView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
            room_data = ChatRoomSerializer(room).data
            messages = ChatMessage.objects.filter(room=room).order_by('created_at')
            message_data = ChatMessageSerializer(messages, many=True).data
            
            response_data = {
                'room': room_data,
                'messages': message_data
            }
            return Response(response_data)
        except ChatRoom.DoesNotExist:
            return Response({"message": "Chat room not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
            user_input = request.data.get('input', '')

            user_message = ChatMessage.objects.create(
                room=room,
                is_user=True,
                content=user_input
            )

            previous_messages = ChatMessage.objects.filter(room=room).order_by('created_at')
            conversation_history = [
                {"role": "system", "content": "You are a helpful assistant."}
            ]
            for msg in previous_messages:
                role = "user" if msg.is_user else "assistant"
                conversation_history.append({"role": role, "content": msg.content})

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=conversation_history
            )

            ai_response = response.choices[0].message.content

            ChatMessage.objects.create(
                room=room,
                is_user=False,
                content=ai_response
            )

            return Response({"message": ai_response})

        except Exception as e:
            return Response({"message": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateChatRoomView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get('name', f"Chat {ChatRoom.objects.filter(user=request.user).count() + 1}")
        room = ChatRoom.objects.create(user=request.user, name=name)
        serializer = ChatRoomSerializer(room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
