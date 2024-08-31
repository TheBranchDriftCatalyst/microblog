from typing import Optional

from ninja import Schema


class UserSchema(Schema):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str


class UserCreateSchema(Schema):
    username: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]


class UserUpdateSchema(Schema):
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]


class UserCredentialsSchema(Schema):
    user_id: int
    password_hash: str
