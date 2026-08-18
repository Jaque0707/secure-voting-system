from cryptography.hazmat.primitives import serialization

from app.crypto.user_keys import generate_user_key_pair


private_key_pem, public_key_pem = generate_user_key_pair()

private_key = serialization.load_pem_private_key(
    private_key_pem,
    password=None,
)

public_key = serialization.load_pem_public_key(
    public_key_pem,
)

derived_public_key = private_key.public_key()

print(
    derived_public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )
    == public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )
)