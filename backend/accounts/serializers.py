from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import CustomUser


# class UserRegistrationSerializer(serializers.ModelSerializer):
#     email = serializers.CharField(required=True, allow_blank=False)
#     password = serializers.CharField(
#         style={"input_type": "password"}, write_only=True, label="비밀번호"
#     )
#     password2 = serializers.CharField(
#         style={"input_type": "password2"}, write_only=True, label="비밀번호 확인"
#     )

#     class Meta:
#         model = CustomUser
#         fields = [
#             "email",
#             "password",
#             "password2",
#         ]

#     def validate_email(self, value):
#         User = get_user_model()
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("이미 가입된 이메일입니다.")
#         return value

#     def validate(self, data):
#         if data['password'] != data['password2']:
#             raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})
#         return data

#     def create(self, validated_data):
#         user = get_user_model().objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password'],
#         )
#         return user

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="비밀번호"
    )
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True, label="비밀번호 확인"
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
            raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})
        return data

    def save(self, request):
        user = CustomUser(
            email=self.validated_data["email"]
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})
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
            user = authenticate(
                email=email,
                password=password,
            )
            if not user:
                msg = "Incorrect credentials."
                raise serializers.ValidationError(msg, code="authorization")
        attrs["user"] = user
        return attrs
    
# MyPage용 serializer 추후 추가가능
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'date_joined', 'last_login']
        read_only_fields = ['date_joined', 'last_login']