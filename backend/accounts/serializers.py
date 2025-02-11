from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="비밀번호"
    )
    password2 = serializers.CharField(
        style={"input_type": "password2"}, write_only=True, label="비밀번호 확인"
    )

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "password",
            "password2",
        ]

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("이미 가입된 이메일입니다.")
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        return data

    def save(self, request):
        user = CustomUser(
            email=self.validated_data["email"]
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ["email", "password"]

    def authenticate(self, **options):
        return authenticate(self.context["request"], **options)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        if email and password:
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("사용자가 존재하지 않습니다.")

            # 비밀번호 확인
            if not user.check_password(password):
                raise serializers.ValidationError("이메일 또는 비밀번호가 올바르지 않습니다.")

            # 이메일 인증 여부 확인
            if not user.is_email_verified:
                raise serializers.ValidationError("이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.")

            # 모든 검증을 통과한 경우 인증 진행
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("인증 과정에서 오류가 발생했습니다.")

        else:
            raise serializers.ValidationError("이메일과 비밀번호를 모두 입력해주세요.")
        attrs["user"] = user
        return attrs
    

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(required=True, write_only=True)
    new_password2 = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password1'] != data['new_password2']:
            raise serializers.ValidationError("두 비밀번호가 일치하지 않습니다.")
        return data

# MyPage용 serializer 추후 추가가능
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'date_joined', 'last_login']
        read_only_fields = ['date_joined', 'last_login']

class InterestTickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['interest_tickers']

    def validate_interest_tickers(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("관심 티커 값은 리스트 형식이어야 합니다.")
        if len(value) > 10:
            raise serializers.ValidationError("최대 10개까지의 티커만 추가할 수 있습니다.")
        return value