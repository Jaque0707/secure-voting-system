from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

from app.crypto.user_keys import generate_user_key_pair


private_key_pem, public_key_pem = generate_user_key_pair()

private_key = serialization.load_pem_private_key(
    private_key_pem,
    password=None,
)

public_key = serialization.load_pem_public_key(
    public_key_pem,
)

message = b"secure voting system"

signature = private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH,
    ),
    hashes.SHA256(),
)

public_key.verify(
    signature,
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH,
    ),
    hashes.SHA256(),
)

print("Signature valid")