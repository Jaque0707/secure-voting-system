import hashlib

def hash_password(password: str) -> str:
    # Genera directo el hash de 64 caracteres hex (32 bytes)
    return hashlib.shake_128(password.encode('utf-8')).hexdigest(32)