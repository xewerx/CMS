package models

import "time"

type User struct {
	ID        string    `bson:"_id,omitempty" json:"id,omitempty"`
	Role      string    `bson:"role" json:"role"`
	Login     string    `bson:"login" json:"login"`
	Password  string    `bson:"password" json:"password"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	DeletedAt time.Time `bson:"deleted_at" json:"deleted_at"`
}
