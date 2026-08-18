from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID


def create_certificate_signing_request(
    private_key: rsa.RSAPrivateKey,
    username: str,
):
    subject = x509.Name(
        [
            x509.NameAttribute(
                NameOID.COMMON_NAME,
                username,
            )
        ]
    )

    csr = (
        x509.CertificateSigningRequestBuilder()
        .subject_name(subject)
        .sign(
            private_key,
            hashes.SHA256(),
        )
    )

    return csr.public_bytes(
        serialization.Encoding.PEM
    )