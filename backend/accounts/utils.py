# import uuid
# from django.utils import timezone
# from datetime import timedelta

# def generate_email_token():
#     return uuid.uuid4().hex

# def is_email_token_valid(user, token):
#     return user.email_verification_token == token and \
#            user.last_login + timedelta(hours=24) > timezone.now()