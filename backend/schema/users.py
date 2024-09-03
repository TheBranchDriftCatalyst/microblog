from typing import Optional, get_type_hints, Type

from ninja import Schema


class UserSchema(Schema):
    id: int
    username: str
    avatar: str
    # first_name: Optional[str] # TODO: remove these from the model
    # last_name: Optional[str] # TODO: remove these from the model
    email: str


class UserCreateSchema(Schema):
    username: Optional[str]
    avatar: Optional[str]
    password: str
    # first_name: Optional[str]
    # last_name: Optional[str]
    email: Optional[str]


class UserUpdateSchema(Schema):
    username: Optional[str]
    avatar: Optional[str]
    email: Optional[str]
