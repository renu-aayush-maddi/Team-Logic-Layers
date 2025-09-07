



import redis  # Make sure you're importing the correct library, not your file

redis_client = redis.Redis(
    host="redis-16546.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port=16546,
    password="zKZdqZREDVZnztblu7YWL96Mmd5f0KaE",
    decode_responses=True
)

redis_client.set("test_key", "Hello, Redis Cloud!")
print(redis_client.get("test_key"))

print(redis_client.ping())  # Check if Redis connection is working
