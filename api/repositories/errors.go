package repositories

import "errors"

var (
	ErrNotFound        = errors.New("not found")
	ErrInvalidObjectId = errors.New("invalid object id")
)
