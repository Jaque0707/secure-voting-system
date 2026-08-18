from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


def generate_user_key_pair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )

    public_key = private_key.public_key()

    private_key_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )

    public_key_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )

    return private_key_pem, public_key_pem

def validate_public_key(public_key_pem: str):

    try:

        public_key = serialization.load_pem_public_key(
            public_key_pem.encode("utf-8")
        )

    except Exception:
        return False


    if not isinstance(
        public_key,
        rsa.RSAPublicKey
    ):
        return False


    if public_key.key_size != 2048:
        return False


    return True