from django_redis import get_redis_connection

def store_refresh_token(user_id, refresh_token, expiration_seconds):
    redis_conn = get_redis_connection("default")
    key = f"refresh_token:{user_id}"
    redis_conn.set(key, refresh_token, ex=expiration_seconds)

def get_refresh_token(user_id):
    try:
        redis_conn = get_redis_connection("default")
        key = f"refresh_token:{user_id}"
        refresh_token = redis_conn.get(key)
        if refresh_token is None:
            raise ValueError("Redis에 저장된 refresh token이 없습니다.")
        return refresh_token.decode('utf-8')
    except Exception as e:
        raise ValueError(f"Redis에서 refresh token 가져오기 오류: {str(e)}")

def delete_refresh_token(user_id):
    redis_conn = get_redis_connection("default")
    key = f"refresh_token:{user_id}"
    redis_conn.delete(key)
