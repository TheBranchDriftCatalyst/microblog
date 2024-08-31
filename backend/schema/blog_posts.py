from datetime import datetime
from typing import Optional

from ninja import Schema


class BlogPostSchema(Schema):
    id: int
    title: str
    content: str  # This can be the raw markdown content
    author_id: int
    created_at: datetime
    updated_at: datetime
    # rendered_content: Optional[str] = None  # Optionally include rendered HTML


class BlogPostCreateSchema(Schema):
    title: str
    content: str  # Expecting markdown content
    author_id: int


class BlogPostUpdateSchema(Schema):
    title: Optional[str]
    content: Optional[str]
