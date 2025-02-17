from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ChatRoom, ChatMessage
from .serializers import ChatRoomSerializer, ChatMessageSerializer
from django.conf import settings
from config.authentication import CookieJWTAuthentication
import requests

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

            ChatMessage.objects.create(
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

            NGROK_URL = settings.NGROK_URL
            request_body = {
                "model": "custom-news-bot",
                "messages": conversation_history
            }
            api_response = requests.post(f"{NGROK_URL}/v1/chat/completions", json=request_body)

            if api_response.status_code != 200:
                raise Exception(f"Ngrok API error: {api_response.status_code}")

            response_data = api_response.json()
            ai_response = response_data['choices'][0]['message']['content']

            ChatMessage.objects.create(
                room=room,
                is_user=False,
                content=ai_response
            )

            return Response({"message": ai_response})

        except Exception as e:
            return Response({"message": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
            room.delete()
            return Response({"message": "Chat room deleted successfully"}, status=status.HTTP_200_OK)
        except ChatRoom.DoesNotExist:
            return Response({"message": "Chat room not found"}, status=status.HTTP_404_NOT_FOUND)

class CreateChatRoomView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get('name', f"Chat {ChatRoom.objects.filter(user=request.user).count() + 1}")
        room = ChatRoom.objects.create(user=request.user, name=name)
        serializer = ChatRoomSerializer(room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CompanyAnalysisView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        ticker = request.data.get('ticker', '').strip()
        if not ticker:
            return Response({"report": "티커 값이 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)
        payload = {"ticker": ticker}
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
        except ChatRoom.DoesNotExist:
            return Response(
                {"report": "Chat room not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            api_response = requests.post(
                f"{settings.NGROK_URL}/analyze_company",
                json=payload
            )
            if api_response.status_code != 200:
                raise Exception(f"Ngrok API 에러: {api_response.status_code}")

            data = api_response.json()
            report = data.get("report", "기업 분석 실패")
            ChatMessage.objects.create(
                room=room,
                is_user=False,
                ticker=ticker,
                content=report,
                type="analysis",
            )
            
            return Response({"report": report})
        except Exception as e:
            return Response(
                {"report": f"Error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CompanyDetailView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        ticker = request.data.get('ticker', '').strip()
        if not ticker:
            return Response({"report": "티커 값이 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)
        payload = {"ticker": ticker}
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
        except ChatRoom.DoesNotExist:
            return Response(
                {"report": "Chat room not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            api_response = requests.post(
                f"{settings.NGROK_URL}/analyze_detail",
                json=payload
            )
            if api_response.status_code != 200:
                raise Exception(f"Ngrok API 에러: {api_response.status_code}")
            data = api_response.json()
            report = data.get("report", "상세 분석 실패")
            ChatMessage.objects.create(
                room=room,
                is_user=False,
                ticker=ticker,
                content=report,
                type="detail",
            )
            return Response({"report": report})
        except Exception as e:
            return Response(
                {"report": f"Error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class ChartView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        ticker = request.data.get('ticker', '').strip()
        if not ticker:
            return Response(
                {"chart_html": "<h3>티커 값이 필요합니다.</h3>"},
                status=status.HTTP_400_BAD_REQUEST
            )
        payload = {"ticker": ticker}
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
        except ChatRoom.DoesNotExist:
            return Response(
                {"report": "Chat room not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            api_response = requests.post(
                f"{settings.NGROK_URL}/chart",
                json=payload
            )
            if api_response.status_code != 200:
                raise Exception(f"Ngrok API 에러: {api_response.status_code}")
            data = api_response.json()
            chart_html = data.get("chart_html", "<h3>차트 분석 실패</h3>")
            analysis_text = data.get("analysis", "분석 데이터 없음")
            ChatMessage.objects.create(
                room=room,
                is_user=False,
                ticker=ticker,
                content=analysis_text,
                type="chart",
            )
            return Response({"chart_html": chart_html, "analysis": analysis_text})
        except Exception as e:
            return Response(
                {"chart_html": f"<h3>Error: {str(e)}</h3>"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CallNewsView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id, user=request.user)
        except ChatRoom.DoesNotExist:
            return Response(
                {"report": "Chat room not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            api_response = requests.post(f"{settings.NGROK_URL}/call_news")
            if api_response.status_code != 200:
                raise Exception(f"Ngrok API 에러: {api_response.status_code}")

            data = api_response.json()
            count = data.get("count", 0)
            news = data.get("news", [])

            if count == 0 or not news:
                news_content = "현재 가져올 수 있는 비즈니스 뉴스가 없습니다."
            else:
                limited_news = news[:5]
                news_titles = [article.get('title', '제목 없음') for article in limited_news]
                news_content = "\n".join(news_titles)

            ChatMessage.objects.create(
                room=room,
                is_user=False,
                content=news_content,
                type="news",
            )
            return Response({"report": news_content})
        except Exception as e:
            return Response(
                {"report": f"Error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
