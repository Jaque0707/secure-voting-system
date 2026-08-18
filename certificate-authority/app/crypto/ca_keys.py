from pathlib import Path

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


KEYS_DIR = Path("/app/keys")

PRIVATE_KEY_PATH = KEYS_DIR / "ca_private_key.pem"
PUBLIC_KEY_PATH = KEYS_DIR / "ca_public_key.pem"


def generate_ca_keys():
    KEYS_DIR.mkdir(parents=True, exist_ok=True)

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

    PRIVATE_KEY_PATH.write_bytes(private_key_pem)
    PUBLIC_KEY_PATH.write_bytes(public_key_pem)

    return PRIVATE_KEY_PATH, PUBLIC_KEY_PATH

def ensure_ca_keys():
    if PRIVATE_KEY_PATH.exists() and PUBLIC_KEY_PATH.exists():
        return

    generate_ca_keys()